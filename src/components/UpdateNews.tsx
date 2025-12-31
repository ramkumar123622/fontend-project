"use client";

import { NewsModel } from "@/Models/page";
import { Input } from "./ui/input";
import { Formik } from "formik";
import { useTransition } from "react";
import { updateNews } from "@/lib/actions";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";

export default function UpdateNews({ news }: { news: NewsModel }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  return (
    <div>
      <Formik
        initialValues={{
          title: news.title,
          description: news.description,
          image: news.image,
        }}
        onSubmit={(val) => {
          startTransition(async () => {
            const res = await updateNews(news.id ?? "", val);
            if (res.success) {
              toast.success(res.message);
              router.back();
            } else {
              toast.error(res.message);
            }
          });
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 max-w-sm"
          >
            <Input
              value={values.title}
              onChange={handleChange}
              type="text"
              name="title"
              placeholder="Title"
              className="w-full max-w-sm border-2 p-1 rounded-md"
            />

            <input
              value={values.description}
              onChange={handleChange}
              name="description"
              placeholder="Description"
              className="w-full max-w-sm border-2 p-1 rounded-md"
            />

            <input
              value={values.image}
              onChange={handleChange}
              name="image"
              placeholder="image"
              className="w-full max-w-sm border-2 p-1 rounded-md"
            />
            <Button type="submit">
              {isPending && <Spinner />}
              Submit
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
}
