"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Spinner } from "@/components/ui/spinner";
import { addNews } from "@/lib/actions";

import { useActionState } from "react";
import toast from "react-hot-toast";

const postData = async (prevState: any, formData: FormData) => {
  const res = await addNews({
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    image: formData.get("image") as string,
  });
  if (!res.success) {
    toast.error(res.message);
  } else {
    toast.success(res.message);
  }
};

export default function AddNews() {
  const [error, submitAction, ispending] = useActionState(postData, null);

  return (
    <div>
      <form action={submitAction} className="flex flex-col gap-5 max-w-sm">
        <Input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full max-w-sm border-2 p-1 rounded-md"
        />

        <input
          name="description"
          placeholder="Description"
          className="w-full max-w-sm border-2 p-1 rounded-md"
        />

        <input
          name="image"
          placeholder="image"
          className="w-full max-w-sm border-2 p-1 rounded-md"
        />
        <Button type="submit">
          {ispending && <Spinner />}
          Submit
        </Button>
      </form>
    </div>
  );
}
