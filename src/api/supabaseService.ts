import CommunityMember from '@/types/CommunityMember';
import Partner from '@/types/Partner';
import Category from '@/types/Category';
import { createClient } from '@/utils/supabase/supabaseClient';
import { SupabaseTables } from '@/types/enums/SupabaseTables';
import { ProductType } from '@/app/context/SetProductContext';
import Product from '@/types/Product';
import OutOfStockProduct from '@/types/OutOfStockProduct';

type SelectPaginatedOptions = {
  columns?: string;
  filters?: { column: string; value: any }[];
  getCount?: boolean;
  limit?: number;
  start?: number;
  end?: number;
  searchQuery?: string;
  searchColumn?: string;
  minPrice?: number;
  maxPrice?: number;
  categoryIds?: number[];
};

class SupabaseService {
  addCommunityMember(member: CommunityMember) {
    return this.insert(SupabaseTables.COMMUNITY, member);
  }

  addPartner(partner: Partner) {
    return this.insert(SupabaseTables.PARTNERS, partner);
  }

  addCategory(category:  {
    name: string;
  }) {
    return this.insert(SupabaseTables.CATEGORIES, category)
  }

  getCategories() {
    return this.select<Category>(SupabaseTables.CATEGORIES)
  }

  upadteCategory(id: string, data: {name: string}) {
    return this.update(SupabaseTables.CATEGORIES, id, data)
  }

  deleteCategory(id: string) {
    return this.delete(SupabaseTables.CATEGORIES, id)
  }

  addProduct(product: ProductType) {
    return this.insert(SupabaseTables.PRODUCTS, product)
  }

  getProducts( limit: number, start?: number, end?:number, searchQuery?: string, searchColumn?: string, minPrice?: number,
  maxPrice?: number,
  categoryIds?: number[], filters?:{ column: string; value: any }[],
){
    return this.selectPaginated<Product>(SupabaseTables.PRODUCTS, {columns: "*", filters: filters, getCount: true, limit, start, end, searchQuery, searchColumn, minPrice, categoryIds, maxPrice})
  }

  getProduct(productId: number) {
    return this.selectRow<Product>(SupabaseTables.PRODUCTS, productId)
  }

  upadteProduct(product:Product) {
    return this.update(SupabaseTables.PRODUCTS, product.id, product)
  }

  deleteProduct(id: number) {
    return this.delete(SupabaseTables.PRODUCTS, id)
  }

  toggleOutOfStock(id: number, data: boolean) {
    return this.update(SupabaseTables.PRODUCTS, id, {is_out_of_stock: data})
  }

  toggleIsFeatured(id: number, data: boolean) {
    return this.update(SupabaseTables.PRODUCTS, id, {is_featured: data})
  }

  updateCostPrice(id: number, field: keyof Pick<Product, 'price' | 'discounted_price'>,  price: string) {
    return this.update(SupabaseTables.PRODUCTS, id, {[field]: price})
  }

  async getOutOfStockProducts(): Promise<OutOfStockProduct[]> {
    const { data, error } = await createClient()
      .rpc('get_out_of_stock_products');

    if (error) throw error;
    
    return data || []; 
  }

  async updateStock(productId: number, stock: number, variantType: string | null, variantValue: string | null) {
    const { error } = await createClient().rpc('update_stock', {
      p_product_id: productId, 
      p_new_stock: stock,
      p_variant_type: variantType,  
      p_variant_value: variantValue
    });

    if (error) throw error;
  }

  private async insert<T>(table: SupabaseTables, data: T) {
    const { error } = await createClient().from(table).insert([data]).select()
    if (error) throw error;

  }
  

  private async select<T>(
    table: SupabaseTables,
    columns: string = "*",
    filters?: { column: string; value: any }[]
  ): Promise<T[]> {
    let query = createClient().from(table).select(columns).order('created_at', { ascending: false });

    if (filters) {
      filters.forEach(({ column, value }) => {
        query = query.eq(column, value);
      });
    }

    const { data, error } = await query;
    if (error) throw error;

    return data as T[];
  }

  private async selectRow<T>(table: SupabaseTables, id: number) {
    const query = createClient().from(table).select('*').eq('id', id)
    .single();

    const { error, data } = await query

    if (error) throw error;

    return data as T;
  
  }

  private applyFilters(query: any, options: SelectPaginatedOptions) {
    if (options.filters) {
      options.filters.forEach(({ column, value }) => {
        query = query.eq(column, value);
      });
    }

    if (options.minPrice !== undefined && options.maxPrice !== undefined) {
      query = query.or(
        `price.gte.${options.minPrice},discounted_price.gte.${options.minPrice}`
      ).or(
        `price.lte.${options.maxPrice},discounted_price.lte.${options.maxPrice}`
      );
    }

    if (options.categoryIds && options.categoryIds.length > 0) {
      query = query.in("category_id", options.categoryIds);
    }

    return query;
  }

  private async selectPaginated<T>(
    table: SupabaseTables,
    options: SelectPaginatedOptions = {}
  ): Promise<{ data: T[]; count?: number }> {  
    let query = createClient()
      .from(table)
      .select(options.columns ?? "*", options.getCount ? { count: "exact" } : undefined)
      .order("created_at", { ascending: false });

    query = this.applyFilters(query, options);

    if (options.start !== undefined && options.end !== undefined) {
      query = query.range(options.start, options.end);
    }

    if (options.searchQuery && options.searchColumn) {
      query = query.textSearch(options.searchColumn, options.searchQuery, { type: "websearch" });
    }

    query = query.limit(options.limit ?? 10);

    const { data, error, count } = await query;
    if (error) throw error;

    return { data: data as T[], count: count ?? 0 };
  }
  
  private async update<T>(table: SupabaseTables, id: string | number, data: Partial<T>) {
    const { error } = await createClient()
      .from(table)
      .update(data)
      .eq('id', id); 

    if (error) throw error;
  }

  private async delete(table: SupabaseTables, id: string | number) {
    const { error } = await createClient()
      .from(table)
      .delete()
      .eq('id', id);

    if (error) throw error;
  }

}

export const Api = new SupabaseService();
