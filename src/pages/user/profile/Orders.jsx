import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import Loading from '../../../components/user/loading/Loading';
import axios from 'axios';
import style from './profile.module.css';

export default function Orders() {
  const token = localStorage.getItem("userToken");
  const [isLoading, setLOADING] = useState(true);
  const [orders, setOrders] = useState([]);

  const getOrders = async () => {
    try {
      const response = await axios.get(
        `https://ecommerce-node4.onrender.com/order`,
        {
          headers: {
            Authorization: `Tariq__${token}`
          }
        }
      );
      setOrders(response.data.orders);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLOADING(false);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container-fluid mt-4">
      <h1 className="text-center mb-4" style={{ color: "#bc9c72" }}>My Orders</h1>
      {orders.length === 0 ? (
        <h3 className="text-center mt-5">No Orders Found</h3>
      ) : (
        <div className="table-responsive">
          <Table hover variant="dark" className={`table ${style.tableTransparent}`}>
            <thead>
              <tr>
                <th>Order #</th>
                <th>Coupon Name</th>
                <th>Total Price</th>
                <th>Order Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={order._id}>
                  <td>{index + 1}</td>
                  <td>{order.couponName || "No Coupon"}</td>
                  <td>${order.finalPrice.toFixed(2)}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </div>
  );
}
