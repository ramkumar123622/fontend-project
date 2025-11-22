import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./components/ui/RootLayout";
import Home from "./components/ui/features/home/Home";

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
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}
