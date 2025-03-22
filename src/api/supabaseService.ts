import CommunityMember from '@/types/CommunityMember';
import Partner from '@/types/Partner';
import Category from '@/types/Category';
import { createClient } from '@/utils/supabase/supabaseClient';
import { SupabaseTables } from '@/types/enums/SupabaseTables';

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

  getCategories(): Promise<Category[]> {
    return this.select(SupabaseTables.CATEGORIES)
  }

  upadteCategory(id: string, data: {name: string}) {
    return this.update(SupabaseTables.CATEGORIES, id, data)
  }

  deleteCategory(id: string) {
    return this.delete(SupabaseTables.CATEGORIES, id)
  }

  private async insert<T>(table: SupabaseTables, data: T) {
    const { error } = await createClient().from(table).insert([data]);
    if (error) throw error;
  }

  private async select<T>(
    table: SupabaseTables,
    columns: string = '*', 
    filters?: { column: string; value: any }[]
  ): Promise<T[]> {
    const query = createClient().from(table).select(columns);

    if (filters) {
      filters.forEach(({ column, value }) => {
        query.eq(column, value); 
      });
    }

    const { data, error } = await query;

    if (error) throw error;

    return data as T[];
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
