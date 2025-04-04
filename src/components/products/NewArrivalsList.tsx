
import Link from 'next/link';


import { createClient } from '@/utils/supabase/supabaseServer';
import { SupabaseTables } from '@/types/enums/SupabaseTables';

import ProductCard from './ProductCard';
import Product from '@/types/Product';

export default async function NewArrivals() {
  const supabase = await createClient();

  const { data } = await supabase.from(SupabaseTables.PRODUCTS).select("*").limit(8);
  const products = data as Product[];
  return (
    <div className="product-grid grid gap-x-6 gap-y-8">
      {products?.map((product) => (
        <Link key={product.id} href={`/products/${product.id}`}>
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
}
