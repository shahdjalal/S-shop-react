import React from "react";
import CustomNavbar from "./components/user/navbar/Navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Authlayout from "./layouts/Authlayout";
import Adminlayout from "./layouts/Adminlayout";
import Register from "./pages/user/register/Register";
import Login from "./pages/user/login/Login";
import { ToastContainer } from "react-bootstrap";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",

      element: <Authlayout />,

      children: [
        {
          path: "/login",
          element: <Login />,
        },

        {
          path: "/register",
          element: <Register />,
        },
      ],
    },

    {
      path: "/dashboard",

      element: <Adminlayout />,
    },
  ]);
  return (
    <>
    <ToastContainer />
      <RouterProvider router={router} />
    </>
  );
}
