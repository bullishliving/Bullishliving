export default interface Coupon {
  id: number;
  name: string;
  amount: string;
  created_at: string;
  assignee_name: string;
  assignee_email: string;
  commission: number;
  is_active: boolean;
  times_used: number;
  commission_percentage: number;
  available_payout: number;
}
