import useGetCouponUsage from "@/api/query/useGetCouponUsage";

interface Props {
  couponId: number;
}

export default function CouponUsage({ couponId }: Props) {
  const { query: couponUsage } = useGetCouponUsage({
    filters: [{ column: 'discount_code_id', value: Number(couponId) }],
  });
  return (
    <div>CouponUsage</div>
  )
}
