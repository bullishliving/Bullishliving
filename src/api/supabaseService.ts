import CommunityMember from '@/types/CommunityMember';
import Partner from '@/types/Partner';
import Category from '@/types/Category';
import { createClient } from '@/utils/supabase/supabaseClient';
import { SupabaseTables } from '@/types/enums/SupabaseTables';
import { ProductType } from '@/app/context/SetProductContext';
import Product from '@/types/Product';

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

  getProducts( limit: number, start?: number, end?:number, searchQuery?: string, searchColumn?: string, ){
    return this.selectPaginated<Product>(SupabaseTables.PRODUCTS, "*", undefined, true, limit,  start, end, searchQuery, searchColumn)
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

  private async insert<T>(table: SupabaseTables, data: T) {
    const { error } = await createClient().from(table).insert([data]);
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

  private async selectPaginated<T>(
    table: SupabaseTables,
    columns: string = "*",
    filters?: { column: string; value: any }[],
    getCount: boolean = false,
    limit: number = 10,
    start?: number,
    end?: number,
    searchQuery?: string,  // Search text
    searchColumn?: string  // Column to search in
  ): Promise<{ data: T[]; count?: number }> {  
    let query = createClient()
    .from(table)
    .select(columns, getCount ? { count: "exact" } : undefined).order('created_at', { ascending: false });

  if (filters) {
    filters.forEach(({ column, value }) => {
      query = query.eq(column, value);
    });
  }

  if (start !== undefined && end !== undefined) {
    query = query.range(start, end);
  }

   if (searchQuery && searchColumn) {
    query = query.textSearch(searchColumn, searchQuery, { type: 'websearch' });
  }

  query = query.limit(limit);

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
