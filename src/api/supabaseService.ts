import CommunityMember from '@/types/CommunityMember';
import Partner from '@/types/Partner';
import { createClient } from './supabaseClient';
import { SupabaseTables } from '@/types/enums/SupabaseTables';

class SupabaseService {
  addCommunityMember(member: CommunityMember) {
    return this.insert(SupabaseTables.COMMUNITY, member);
  }

  addPartner(partner: Partner) {
    return this.insert(SupabaseTables.PARTNERS, partner);
  }

  private async insert<T>(table: SupabaseTables, data: T) {
    const { error } = await createClient().from(table).insert([data]);
    if (error) throw error;
    console.log(error);
  }
}

export const Api = new SupabaseService();
