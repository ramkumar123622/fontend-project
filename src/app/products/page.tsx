import { product } from "@/Models/page";
import axios from "axios";

export default async function Products() {
  const response = await axios.get("https://dummyjson.com/products");
  const products = response.data.products;
  return (
    <div>
      {products.map((product: product) => {
        return (
          <div key={product.id}>
            <h1>{product.title}</h1>
            <p>{product.description}</p>
            <p>{product.category}</p>
            <h2>{product.price}</h2>
            <h2>{product.stock}</h2>
            <p>{product.tags}</p>
          </div>
        );
      })}
    </div>
  );
}
