import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/ui/RootLayout";
import Home from "./components/features/home/Home";
import Login from "./components/features/authentication/Login";
import Register from "./components/features/authentication/Register";
import AdminPanel from "./components/features/admin/AdminPanel";
import ProductAddForm from "./components/features/admin/ProductAddForm";
import ProductEdit from "./components/features/admin/ProductEdit";
import ProductDetail from "./components/features/products/productDetail";
import CheckOut from "./components/features/carts/CheckOut";
import UserProfile from "./components/features/profile/UserProfile";
import Order from "./components/features/orders/Order";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "signup",
          element: <Register />,
        },
        {
          path: "profile",
          element: <UserProfile />,
        },
        {
          path: "admin-panel",
          element: <AdminPanel />,
        },
        {
          path: "product-edit/:id",
          element: <ProductEdit />,
        },
        {
          path: "products/:id",
          element: <ProductDetail />,
        },
        {
          path: "product-add",
          element: <ProductAddForm />,
        },
        {
          path: "order/:id",
          element: <Order />,
        },

        {
          path: "checkout",
          element: <CheckOut />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
