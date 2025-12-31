// import DeleteEmployee from "@/components/DeleteEmployee";
// import { Button } from "@/components/ui/button";

// import { Employee } from "@/Models/page";
// import axios from "axios";
// import { EditIcon } from "lucide-react";
// import Link from "next/link";

// export default async function Home() {
//   const res = await axios.get(
//     "https://6940d172993d68afba6d18b3.mockapi.io/employees"
//   );
//   const employees = res.data;

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-4">Employee List</h1>

//       <div className="space-y-3">
//         {employees.map((employee: Employee) => (
//           <div key={employee.id} className="border p-4 rounded-md ">
//             <p>
//               <strong>Name:</strong> {employee.name}
//             </p>
//             <p>
//               <strong>Age:</strong> {employee.age}
//             </p>
//             <p>
//               <strong>Position:</strong> {employee.position}
//             </p>
//             <div className="mt-5 flex gap-5">
//               <Link href={`/employees/${employee.id}`}>
//                 <Button variant={"ghost"}>
//                   <EditIcon />
//                 </Button>
//               </Link>

//               <DeleteEmployee id={employee.id ?? ""} />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import DeleteNews from "@/components/DeleteNews";
import { Button } from "@/components/ui/button";
import { getNews } from "@/lib/actions";
import { NewsModel } from "@/Models/page";

import { EditIcon } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const res = await getNews();
  const news: NewsModel[] = res.data ?? [];
  return (
    <div>
      {news.map((news: any) => (
        <div
          key={news._id}
          style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h2>{news.title}</h2>
          <p>{news.description}</p>
          <p>{news.image}</p>
          <div className="flex ">
            <Link href={`/news/${news._id}`} className="p-3">
              <Button>
                <EditIcon />
              </Button>
            </Link>
            <DeleteNews id={news._id.toString()} />
          </div>
        </div>
      ))}
    </div>
  );
}
