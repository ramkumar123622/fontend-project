import { Formik } from "formik";
import { useGetProductsQuery } from "../products/productApi.js";
import ProductCard from "../products/ProductCard.jsx";
import ProductCardSkeleton from "../products/ProductCardSkeleton.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

export default function Home() {
  const [params, setParams] = useSearchParams();
  const queryPage = params.get("page") ?? 1;
  const query = params.get("search")
    ? {
        search: params.get("search"),
      }
    : null;

  const { isLoading, error, data } = useGetProductsQuery({
    ...query,
    page: queryPage,
  });
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [queryPage]);

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

  // ✅ Fix: Render error safely instead of directly
  if (error)
    return (
      <h1 className="text-red-500">
        {error.data?.message || error.status || "Something went wrong"}
      </h1>
    );

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold mx-85">Welcome To Online Shops</h1>

      <Formik
        initialValues={{
          search: "",
        }}
        onSubmit={(val, { resetForm }) => {
          setParams({ search: val.search });
          resetForm();
        }}
      >
        {({ handleChange, handleSubmit, values, touched, errors }) => (
          <form onSubmit={handleSubmit} className="mt-5 mb-5 max-w-sm">
            <div className="flex gap-5">
              <Input
                name="search"
                onChange={handleChange}
                value={values.serach}
                placeholder="search"
              />
              <Button>Search</Button>
            </div>
          </form>
        )}
      </Formik>

      <div className="grid grid-cols-4 gap-5 items-start">
        {data?.products?.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>

      <div className="flex gap-5 my-5 justify-center">
        <Button
          onClick={() => setParams({ page: Number(queryPage) - 1 })}
          disabled={Number(queryPage) === 1}
        >
          Previous
        </Button>
        <h2>{params.get("page") ?? 1}</h2>
        <Button
          disabled={Number(queryPage) === 3}
          onClick={() => setParams({ page: Number(queryPage) + 1 })}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
