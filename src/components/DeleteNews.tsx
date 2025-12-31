"use client";

import { useTransition } from "react";
import { Button } from "./ui/button";
import { removeNews } from "@/lib/actions";
import { Spinner } from "./ui/spinner";
import { Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";

interface DeleteNewsProps {
  id: string;
}

export default function DeleteNews({ id }: DeleteNewsProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    startTransition(async () => {
      const res = await removeNews(id);
      await removeNews(id);
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    });
  };
  return (
    <div className="p-3">
      <Button onClick={() => handleDelete(id)} disabled={isPending}>
        {isPending && <Spinner />}
        <Trash2Icon />
      </Button>
    </div>
  );
}
