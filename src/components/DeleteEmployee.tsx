"use client";

import { removeEmployee } from "@/lib/actions";
import { useTransition } from "react";
import { Button } from "./ui/button";
import { Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { start } from "repl";
import { Spinner } from "./ui/spinner";

export default function DeleteEmployee({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();
  const handleRemove = () => {
    startTransition(async () => {
      const response = await removeEmployee(id);
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
    });
  };
  return (
    <div>
      {isPending ? (
        <Button disabled variant={"ghost"}>
          <Spinner /> Loading...
        </Button>
      ) : (
        <Button onClick={handleRemove} variant={"ghost"}>
          <Trash2Icon />
        </Button>
      )}
    </div>
  );
}
