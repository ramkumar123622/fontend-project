import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { TrashIcon } from "lucide-react";
import { useSelector } from "react-redux";
import { useRemoveProductMutation } from "../products/productApi";
import toast from "react-hot-toast";

export function RemoveProduct({ id }) {
  const { user } = useSelector((state) => state.userSlice);
  const [removeProduct, { isLoading }] = useRemoveProductMutation();
  const handleRemoveProduct = async () => {
    try {
      console.log("Deleting product id:", id);
      console.log("Token:", user.token);
      await removeProduct({ id, token: user.token }).unwrap();
      toast.success("Product Removed Successfully");
    } catch (error) {
      toast.error(error?.data?.message || "Something went wrong");
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="bg-red-700" variant="outline" disabled={isLoading}>
          {isLoading ? <Spinner /> : <TrashIcon />}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            Product.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemoveProduct}>
            Confirm
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
