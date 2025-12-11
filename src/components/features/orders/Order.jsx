// import { useParams } from "react-router-dom";
// import { useGetOrderQuery } from "./orderApi";
// import { base } from "@/app/mainApi";
// import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

// export default function Order() {
//   const { id } = useParams();
//   const { data, error, isLoading } = useGetOrderQuery(id);

//   if (isLoading) return <h1>Loading...</h1>;
//   if (error)
//     return (
//       <h1 className="text-pink-500">
//         {error?.error || error.data?.message}
//       </h1>
//     );

//   return (
//     <div>
//       {data && (
//         <div>
//           <h3>OrderId: {data.order._id}</h3>
//           {/* <p>CreatedAt: {data.order.createdAt}</p> */}
//           <hr />

//           <div className="mt-5">
//             {data.order.products?.map((item) => (
//               <div key={item._id} className="flex gap-5">
//                 <Avatar className="size-20">
//                   <AvatarImage
//                     src={`${base}/${item.product.image}`}
//                     alt="product image"
//                   />
//                   <AvatarFallback>IMG</AvatarFallback>
//                 </Avatar>

//                 <div className="space-y-2">
//                   <p>Product: {item.product.title}</p>
//                   <p>Price: Rs.{item.product.price}</p>
//                   <p>Quantity: {item.quantity}</p>
//                 </div>
//               </div>
//             ))}
//           </div>

//           <div className="mt-12">
//             <h3>Total Amount: Rs.{data.order.totalAmount}</h3>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import { useParams } from "react-router-dom";
import { useGetOrderQuery } from "./orderApi";
import { base } from "@/app/mainApi";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";

export default function Order() {
  const { id } = useParams();
  const { data, error, isLoading } = useGetOrderQuery(id);

  if (isLoading) return <h1>Loading...</h1>;
  if (error)
    return (
      <h1 className="text-pink-500">{error?.error || error.data?.message}</h1>
    );
  console.log(data);

  const order = data?.order;

  return (
    <div>
      {order && (
        <div>
          <h3>OrderId: {order._id}</h3>
          <hr />

          <div className="mt-5 space-y-4">
            {order.products?.map((item) => (
              <div key={item._id} className="flex gap-5 items-center">
                <Avatar className="w-16 h-16">
                  <AvatarImage
                    src={`${base}/${item.product?.image}`}
                    alt={item.product?.title}
                  />
                  <AvatarFallback>IMG</AvatarFallback>
                </Avatar>

                <div className="space-y-1">
                  <p>Product: {item.product?.title}</p>
                  <p>Price: Rs.{item.product?.price}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h3>Total Amount: Rs.{order.totalAmount}</h3>
          </div>
        </div>
      )}
    </div>
  );
}
