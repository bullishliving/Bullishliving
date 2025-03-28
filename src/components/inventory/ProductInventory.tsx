import Image from "next/image";
import UiDropDown, { DropDownData } from "../ui/UiDropDown";
import UiIcon from "../ui/UiIcon";
import UiTable, { Header } from "../ui/UiTable";
import Product from "@/types/Product";

interface Props {
  products: Product[];
  getProduct: (id: number) => Product | undefined
  setActiveProduct: (product: Product) => void;
  showDeleteConfirm: VoidFunction;
  showAddProduct: VoidFunction
}

export default function ProductInventory({ products, showAddProduct, showDeleteConfirm ,setActiveProduct, getProduct }: Props) {
  const productDropDownOptions: DropDownData[] = [
    {
      label: (
        <div className="flex items-center gap-2 stroke-tertiary-700 fill-white">
          <UiIcon icon="Star" size="24" />
          <p className="text-sm font-montserrat text-[#4F4F4F]">
            Add to collections
          </p>
        </div>
      ),
      func: () => {

      },
    },
    {
      label: (
        <div className="flex items-center gap-2">
          <UiIcon icon="Edit" size="24" />
          <p className="text-sm font-montserrat text-[#4F4F4F]">Edit</p>
        </div>
      ),
      func: (id) => {
        const product = getProduct(Number(id));
        console.log(product);
        
        setActiveProduct(product!);
        
        showAddProduct()
      },
    },
    {
      label: (
        <div className="flex items-center gap-2 stroke-[#E41C11]">
          <UiIcon icon="Trash" size="24" />
          <p className="text-sm font-montserrat text-[#E41C11]">Delete</p>
        </div>
      ),
      func: (id) => {
        const product = getProduct(Number(id));
        if(!product) return;

        setActiveProduct(product!);
        showDeleteConfirm()
      },
    },
  ];
  const productsHeaders: Header[] = [
    {
      query: 'name',
      title: 'Name',
    },
    {
      query: 'sellingPrice',
      title: 'Selling Price',
    },
    {
      query: 'sold',
      title: 'Sold',
    },
    {
      query: 'left',
      title: 'Left',
    },
    {
      query: 'revenue',
      title: 'Revenue',
    },
    {
      query: 'In stock',
      title: 'inStock',
    },
    {
      query: 'action',
      title: 'Action',
    },
  ];

  const productsNodes = products.map((product) => {
    return {
      id: `${product.id}`,
      name: (
        <div className="flex gap-4 items-center">
          <Image
            width={40}
            height={40}
            alt={product.name}
            src={product.images![0] as string}
            className="w-10 h-10 rounded-lg "
          />
          <div className="flex gap-2 items-center">
            <p>{product.name}</p>{' '}
            {product.variants.length > 0 && (
              <span className="text-orange-400 text-xs rounded-full w-[25px] h-6 bg-orange-50 flex justify-center items-center">
                V
              </span>
            )}
          </div>
        </div>
      ),
      sellingPrice: (
        <div className="flex gap-3 items-start">
          <div>
            <p>
              ₦
              {Number(
                product.discounted_price
                  ? product.discounted_price
                  : product.price
              ).toLocaleString()}
            </p>
            {product.discounted_price && (
              <p className="font-normal text-tertiary-700 line-through">
                ₦{Number(product.price).toLocaleString()}
              </p>
            )}
          </div>
          <button>
            {' '}
            <UiIcon icon="Edit" size="24" />
          </button>
        </div>
      ),
      sold: '20',
      left: '40',
      revenue: '₦10,000,200',
      inStock: '',
      action: (
        <UiDropDown
          align="start"
          side="bottom"
          options={productDropDownOptions}
          itemId={`${product.id}`}
        />
      ),
    };
  });
  return (
    <div className="bg-white p-4 rounded-[8px]">
      <div className="w-full font-montserrat mb-4">
        <h3 className="font-bold text-secondary-500">All Products</h3>
      </div>
      <UiTable headers={productsHeaders} data={productsNodes} />
    </div>
  );
}
