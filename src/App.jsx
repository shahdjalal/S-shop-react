import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authlayout from "./layouts/Authlayout";
import Adminlayout from "./layouts/Adminlayout";
import Userlayout from "./layouts/Userlayout";
import Login from "./pages/user/login/Login";
import Register from "./pages/user/register/Register";
import Home from "./pages/user/home/Home";
import Categories from "./pages/user/categories/Categories";
import Products from "./pages/user/products/Products";
import CategoryProducts from "./pages/user/products/CategoryProducts";
import ProductDetails from "./pages/user/products/ProductDetails";


export default function App() {
  const router = createBrowserRouter([
    {
      path: "/auth",
      element: <Authlayout />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/",
      element: <Userlayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/categories",
          element: <Categories />,
        },
        {
          path: "/categories/:categoryid",
          element: <CategoryProducts />,
        },
        {
          path: "/products",
          element: <Products />,
        },
        {
          path: "/products/:productId",
          element: <ProductDetails />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <Adminlayout />,
    },
   
  ]);

  return <RouterProvider router={router} />;
}
