import { base } from "@/app/mainApi";
import {
  Card,
  CardHeader,
  CardTitle,
  CardFooter,
  CardContent,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {
  const nav = useNavigate();
  return (
    <div
      onClick={() => nav(`/products/${product._id}`)}
      className="hover:scale-105 delay-100 ease-in duration-75 cursor-pointer relative rounded-xl bg-linear-to-r from-neutral-600 to-violet-300 pt-0 shadow-lg"
    >
      <div className="flex h-40 items-center justify-center">
        <img src={`${base}/${product.image}`} alt="image" className="w-40" />
      </div>

      <Card className="border-none">
        <CardHeader>
          <CardTitle>{product.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3">{product.detail}</p>
        </CardContent>
        <CardFooter className="justify-between gap-2 max-sm:flex-col max-sm:items-stretch">
          <div className="flex flex-col">
            <span className="text-sm font-medium uppercase">Price</span>
            <span className="text-xl font-semibold">Rs.{product.price}</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
