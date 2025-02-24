import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../../../components/user/loading/Loading';
import { Table } from 'react-bootstrap';
import { IoTrashBinOutline } from "react-icons/io5";

import { TiDelete } from "react-icons/ti";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import style from './cart.module.css';

export default function Cart() {
  const token = localStorage.getItem("userToken");
  const [cart, setCart] = useState([]);
  const [isLoading, setLOADING] = useState(true);
  const [isClear, setisClear] = useState(false);
  const navigate = useNavigate();
  
  const getCart = async () => {
    try {
    
      const response = await axios.get(
        `https://ecommerce-node4.onrender.com/cart`,
        {
          headers: {
            Authorization: `Tariq__${token}`
          }
        }
      );
      console.log(response);
      setCart(response.data.products);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLOADING(false);
    }
  };

  const incqty = async (productId) => {
    try {
      const response = await axios.patch(
        `https://ecommerce-node4.onrender.com/cart/incraseQuantity`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`
          }
        }
      );
      console.log(productId);
      setCart(prevCart =>
        prevCart.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } catch (error) {
      console.error('Error while increasing quantity:', error);
    }
  };

  const decqty = async (productId) => {
    try {
      const response = await axios.patch(
        `https://ecommerce-node4.onrender.com/cart/incraseQuantity`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}` 
          }
        }
      );
      console.log(productId);
      setCart(prevCart =>
        prevCart.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } catch (error) {
      console.error('Error while decreasing quantity:', error);
    }
  };

  const deleteItem = async (productId) => {
    try {
      const response = await axios.patch(
        'https://ecommerce-node4.onrender.com/cart/removeItem',
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`
          }
        }
      );
      console.log(response);
      setCart(prevCart => prevCart.filter(item => item.productId !== productId));
      toast.success('Item removed successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error('Error while deleting the item', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error('Error while deleting the item:', error);
    }
  };

  const clearCart = async () => {
    setisClear(true);
    try {
      const response = await axios.patch(
        `https://ecommerce-node4.onrender.com/cart/clear`,
        {},
        {
          headers: {
            Authorization: `Tariq__${token}`
          }
        }
      );
      setCart([]);
      toast.success('Cart cleared successfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error('Error while clearing the cart', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.error('Error while clearing the cart:', error);
    } finally {
      setisClear(false);
    }
  };

  useEffect(() => {
    getCart();
  }, []);



  const handleCheckout = () => {
    const orderData = {
      products: cart.map(item => ({
        productId: item.productId,
        image: item.details.mainImage.secure_url,
        name: item.details.name,
        price: item.details.finalPrice,
        quantity: item.quantity,
        total: item.quantity * item.details.finalPrice
      }))
    };
  
    localStorage.setItem("orderData", JSON.stringify(orderData));
  
   
    navigate("/order");
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className='text-center mb-5'>Shopping Cart</h2>

      <Table hover  bordered variant="dark" className={`table mt-3 ${style.tableCart}`}>
        <thead>
          <tr>
            <th>Image</th>
            <th className={` ${style.name}`}>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th className={`${style.delIcon}`}><TiDelete /></th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item._id}>
              <td>
                <img src={item.details.mainImage.secure_url} className={`w-50 ${style.image}`} alt={item.details.name} />
              </td>
              <td className={` ${style.name}`} >{item.details.name}</td>
              <td>{item.details.finalPrice} $</td>
              <td>
                <button className={`rounded-2 ${style.qtyBtn}`} onClick={() => decqty(item.productId)}>-</button>
                <span className="mx-1">{item.quantity}</span>
                <button  className={`rounded-2 ${style.qtyBtn}`}   onClick={() => incqty(item.productId)}>+</button>
              </td>
              <td>{item.quantity * item.details.finalPrice} $</td>
              <td>
                <IoTrashBinOutline onClick={() => deleteItem(item.productId)} className={`${style.delete}`} />
              </td>
            </tr>
          ))}
          
        </tbody>
        
       
      </Table>
<div className={`${style.btns} `}>


<button className={`btn ${style.check} ps-4 pe-4 w-25`} onClick={handleCheckout}> Check Out</button>
        <button className={`btn ${style.clear} ps-4 pe-4 w-25`} onClick={clearCart} disabled={isClear}>
        {isClear ? "Clearing..." : "Clear Cart"}
      </button>

     
  
</div>
     
    </div>
  );

}
