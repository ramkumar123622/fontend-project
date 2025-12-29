import EditForm from "@/components/EditForm";
import axios from "axios";

interface UpdatePageProps {
  id: string;
}

export default async function UpdatePage({
  params,
}: {
  params: Promise<UpdatePageProps>;
}) {
  const { id } = await params;

  const res = await axios.get(
    `https://6940d172993d68afba6d18b3.mockapi.io/employees/${id}`
  );

  return (
    <div>
      <EditForm employee={res.data} />
    </div>
  );
}
