import { base } from "@/app/mainApi";
import { useGetProductsQuery } from "../products/productApi";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { EditIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { RemoveProduct } from "./RemoveProduct";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function AdminPanel() {
  const nav = useNavigate();
  const { isLoading, error, data } = useGetProductsQuery();

  if (isLoading) return <DotLottieReact src="loading.lottie" loop autoplay />;

  if (error)
    return (
      <h1 className="text-red-500">
        Error: {error?.status} – {error?.error || error?.data?.message}
      </h1>
    );

  return (
    <div className="p-5 not-last:">
      <div>
        <Button
          onClick={() => nav("/product-add")}
          className="text-2xl font-bold mb-5 bg-green-700"
        >
          Add Product
        </Button>
      </div>

      <div className="w-full">
        <div className="[&>div]:rounded-sm [&>div]:border">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead>Name</TableHead>
                <TableHead>Id</TableHead>
                <TableHead>CreatedAt</TableHead>
                <TableHead>Update</TableHead>
                <TableHead>Remove</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.products?.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={`${base}/${item.image}`}
                          alt={item.image}
                        />
                      </Avatar>
                      <div className="font-medium">{item.title}</div>
                    </div>
                  </TableCell>

                  <TableCell>{item._id}</TableCell>

                  <TableCell>{item.createdAt}</TableCell>

                  <TableCell>
                    <Button onClick={() => nav(`/product-edit/${item._id}`)}>
                      <EditIcon />
                    </Button>
                  </TableCell>

                  <TableCell>
                    <RemoveProduct id={item._id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
