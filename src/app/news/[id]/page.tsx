import UpdateNews from "@/components/UpdateNews";
import { getNewsById } from "@/lib/actions";

interface SingleNewsProps {
  id: string;
}

export default async function SingleNews({
  params,
}: {
  params: Promise<SingleNewsProps>;
}) {
  const { id } = await params;
  const res = await getNewsById(id);
  const news = res.data;
  return (
    <div>
      <UpdateNews
        news={{
          id: news._id.toString(),
          title: news.title,
          description: news.description,
          image: news.image,
        }}
      />
    </div>
  );
}
