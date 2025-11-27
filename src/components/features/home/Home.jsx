import { useGetProductsQuery } from "../products/productApi.js";
import ProductCard from "../products/ProductCard.jsx";
import ProductCardSkeleton from "../products/ProductCardSkeleton.jsx";

export default function Home() {
  const { isLoading, error, data } = useGetProductsQuery();
  if (isLoading)
    return (
      <div className="grid grid-cols-4 gap-5 items-start">
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </div>
    );
  if (error) return <h1 className="text-red-500">{error}</h1>;
  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold mx-85">Welcome To Online Shops</h1>

      <div className="grid grid-cols-4 gap-5 items-start">
        {data.products.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
}
