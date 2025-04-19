import Link from 'next/link';

import { createClient } from '@/utils/supabase/supabaseServer';
import { SupabaseTables } from '@/types/enums/SupabaseTables';

import ProductCard from './ProductCard';
import Product from '@/types/Product';

export default async function NewArrivals() {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from(SupabaseTables.PRODUCTS)
      .select('*')
      .limit(8);

    if (error || !data || data.length === 0) {
      console.error('Error fetching new arrivals:', error);
      return null;
    }

    const products = data as Product[];

    return (
      <div className="product-grid grid gap-x-2 md:gap-x-4 gap-y-6 md:gap-y-8">
        {products.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    );
  } catch (err) {
    console.error('Failed to load new arrivals:', err);
    return null;
  }
}
