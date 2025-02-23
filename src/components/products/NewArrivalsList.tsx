import { products } from "@/api/mock/products";

import ProductCard from "./ProductCard";

export default function NewArrivalsList() {
  return (
    <div className="product-grid grid gap-x-6 gap-y-8">
      {products.map((product, index)=>(
        <ProductCard key={index} product={product}/>
      ))}
    </div>
  )
}
