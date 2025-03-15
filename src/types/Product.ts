import { StaticImageData } from "next/image";

export default interface Product {
  id: string;
  name: string;
  price: number;
  images: StaticImageData[];
}
