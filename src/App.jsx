import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/ui/RootLayout";
import Home from "./components/features/home/Home";
import Login from "./components/features/authentication/Login";
import Register from "./components/features/authentication/Register";
import AdminPanel from "./components/features/admin/AdminPanel";
import ProductAddForm from "./components/features/admin/ProductAddForm";
import ProductEdit from "./components/features/admin/ProductEdit";
import ProductDetail from "./components/features/products/productDetail";

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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
