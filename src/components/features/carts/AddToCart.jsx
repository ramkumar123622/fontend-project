import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCart } from "./cartSlice";

export default function AddToCart({ product }) {
  const { qty, setQty } = useState(1);
  const dispatch = useDispatch();
  const increment = () => setQty(qty + 1);
  const decrement = () => setQty(qty - 1);
  const handleCart = () => {
    dispatch(
      setCart({
        title: product.title,
        price: product.price,
        stock: product.stock,
        image: product.image,
        qty,
      })
    );
  };
  return (
    <div className="space-y-5">
      <div className="flex gap-5">
        <Button onClick={decrement}>
          <MinusIcon />
        </Button>

        <h1>{qty}</h1>

        <Button disabled={qty === product.stock} onClick={increment}>
          <PlusIcon />
        </Button>
      </div>
      <Button onClick={handleCart} size="lg" className="bg-green-500">
        Add To Cart
      </Button>
    </div>
  );
}
