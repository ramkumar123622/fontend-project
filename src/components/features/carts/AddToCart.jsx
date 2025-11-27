import { Button } from "@/components/ui/button";
import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";

export default function AddToCart({ product }) {
  const { qty, setQty } = useState(1);
  const increment = () => setQty(qty + 1);
  const decrement = () => setQty(qty - 1);
  return (
    <div className="space-y-5">
      <div className="flex gap-5">
        <Button onClick={decrement}>
          <MinusIcon />
        </Button>

        <h1>{qty}</h1>

        <Button onClick={increment}>
          <PlusIcon />
        </Button>
      </div>
      <Button size="lg" className="bg-green-500">
        Add To Cart
      </Button>
    </div>
  );
}
