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
import Cart from "./pages/user/cart/Cart";
import { ToastContainer } from "react-bootstrap";
import CartContextProvider from "./components/user/context/CartContext";
import Profile from "./pages/user/profile/Profile";
import Info from "./pages/user/profile/Info";
import Orders from "./pages/user/profile/Orders";
import UserContextProvider, { UserContext } from "./components/user/context/UserContext";
import Image from "./pages/user/profile/Image";
import AuthProtectedRout from "./components/user/AuthProtectedRout";
import SendCode from "./pages/user/login/SendCode";
import ResetPassword from "./pages/user/login/ResetPassword";
import Order from "./pages/user/order/Order";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";


export default function App() {
  const router = createBrowserRouter([
    {
      path: "/auth",
      element:<AuthProtectedRout>
       <Authlayout />
       </AuthProtectedRout>
       ,
      children: [
        {
          path: "login",
          element: <Login />,
        },{
        path: "sendcode",
          element: <SendCode />,
        },
        {
          path: "resetPassword",
            element: <ResetPassword />,
          },
        {
          path: "register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/",
      element:<UserContextProvider>
<CartContextProvider>

      <Userlayout />
  
</CartContextProvider>
</UserContextProvider>
      ,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/categories",
          element:
          <ProtectedRoute>
                <Categories />
         
                </ProtectedRoute>
        },
        {
          path: "/categories/:categoryid",
         
          element:  <ProtectedRoute>
            <CategoryProducts />
          </ProtectedRoute>,
        },
        {
          path: "/products",
          element: <ProtectedRoute>
            <Products /></ProtectedRoute> ,
        },{
        path: "/order",
        element: <ProtectedRoute>
          <Order /></ProtectedRoute> ,
      },
        {
          path: "/products/:productId",
          element: <ProtectedRoute><ProductDetails /> </ProtectedRoute>,
        },
        {
          path: "/cart",
          element: <ProtectedRoute><Cart/></ProtectedRoute>,
        },
        {
          path: "/profile",
          element:<ProtectedRoute> <Profile /></ProtectedRoute>,
          children:[
            {
              path:"info",
              element: <Info />
            },
            {
              path:"orders",
              element: <Orders />
            },
            {
              path:"image",
              element: <Image />
            }






          ]
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
