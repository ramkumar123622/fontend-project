import { useParams } from "react-router-dom";
import { useGetProductQuery } from "../products/productApi";
import ProductEditForm from "./ProductEditForm";

export default function ProductEdit() {
  const { id } = useParams();
  const { isLoading, error, data } = useGetProductQuery(id);
  if (isLoading) return <h1>Loading....</h1>;

  if (error)
    return (
      <h1 className="text-red-500">
        {error?.data?.message || "Something went wrong"}
      </h1>
    );

  return (
    <>
      <h1 className="text-2xl font-bold">Product Edit</h1>
      <ProductEditForm product={data.product} />
    </>
  );
}
