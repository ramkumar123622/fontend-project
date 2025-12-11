import { useDispatch, useSelector } from "react-redux";
import { removeCart, setCart } from "./cartSlice";
import { MinusIcon, PlusIcon, Trash2Icon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Button } from "@/components/ui/button";
import ShowDialog from "@/components/ShowDialog";
import CheckOutPart from "./CheckOutPart";
import { base } from "@/app/mainApi";

export default function CheckOut() {
  const { carts } = useSelector((state) => state.cartSlice);
  const dispatch = useDispatch();

  const handleAdd = (item) => {
    dispatch(setCart({ ...item, qty: item.qty + 1 }));
  };

  const handleRemove = (item) => {
    if (item.qty > 1) {
      dispatch(setCart({ ...item, qty: item.qty - 1 }));
    }
  };

  const handleRemoveItem = (item) => {
    dispatch(removeCart(item));
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">CheckOut Page</h2>

      <div className="grid grid-cols-[2fr_1fr] gap-6">
        {/* Cart Table */}
        <div className="overflow-auto border rounded-md">
          {carts.length === 0 ? (
            <p className="p-4 text-center">Your cart is empty.</p>
          ) : (
            <table className="w-full table-auto border-collapse">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left p-2 border">Product</th>
                  <th className="text-left p-2 border">Category</th>
                  <th className="text-center p-2 border">Qty</th>
                  <th className="text-right p-2 border">Price</th>
                  <th className="text-center p-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {carts.map((item) => (
                  <tr
                    key={item._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-2 border">
                      <div className="flex items-center gap-3">
                        <Avatar className="rounded-sm w-10 h-10">
                          <AvatarImage
                            src={`${base}/${item.image}`}
                            alt={item.title}
                          />
                          <AvatarFallback className="text-xs">
                            {item.title}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{item.title}</div>
                          <span className="text-gray-500 text-xs">
                            {item.brand}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-2 border">{item.category}</td>
                    <td className="p-2 border text-center">
                      <div className="flex items-center justify-center gap-2">
                        <Button
                          onClick={() => handleRemove(item)}
                          disabled={item.qty === 1}
                          variant="outline"
                          size="icon"
                        >
                          <MinusIcon className="w-4 h-4" />
                        </Button>
                        <span>{item.qty}</span>
                        <Button
                          onClick={() => handleAdd(item)}
                          disabled={item.qty === item.stock}
                          variant="outline"
                          size="icon"
                        >
                          <PlusIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                    <td className="p-2 border text-right">
                      Rs. {item.price * item.qty}
                    </td>
                    <td className="p-2 border text-center">
                      <ShowDialog
                        func={() => handleRemoveItem(item)}
                        detail="This action cannot be undone. This will permanently delete your account and remove your data from our servers."
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full"
                        >
                          <Trash2Icon className="w-4 h-4" />
                        </Button>
                      </ShowDialog>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Checkout Summary */}
        <CheckOutPart carts={carts} />
      </div>
    </div>
  );
}
