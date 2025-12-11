import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setCart } from "./cartSlice";
import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";

export default function AddToCart({ product }) {
  // Ensure carts is always an array
  const carts = useSelector((state) => state.cartSlice.carts ?? []);

  // Check if product already exists in cart
  const isExist = carts.find((cart) => cart.id === product._id);

  // Default quantity
  const [qty, setQty] = useState(isExist?.qty || 1);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userSlice);
  const nav = useNavigate();

  const increment = () => {
    if (qty < product.stock) setQty(qty + 1);
  };

  const decrement = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const handleCart = () => {
    dispatch(
      setCart({
        id: product._id,
        title: product.title,
        price: product.price,
        stock: product.stock,
        brand: product.brand,
        category: product.category,
        image: product.image,
        qty,
      })
    );

    nav("/checkout");
  };

  return (
    <div className="space-y-5">
      <div className="flex gap-4 items-center">
        <Button disabled={qty === 1} onClick={decrement}>
          <MinusIcon />
        </Button>

        <h3 className="text-xl">{qty}</h3>

        <Button disabled={qty === product.stock} onClick={increment}>
          <PlusIcon />
        </Button>
      </div>

      <Button
        disabled={user?.role === "admin" || !user}
        onClick={handleCart}
        size="lg"
        className="bg-green-600"
      >
        Add To Cart
      </Button>
    </div>
  );
}
