import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Row, Form, FloatingLabel, Button, Table } from "react-bootstrap";
import { toast, Bounce, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import style from "../register/register.module.css";
import shape from "./order.module.css";

export default function Order() {
  const [order, setOrder] = useState(null);
  const [IsLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrder = JSON.parse(localStorage.getItem("orderData"));
    if (storedOrder) {
      setOrder(storedOrder);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [ServerError, setServerError] = useState(null);
  const token = localStorage.getItem("userToken");
  const handleSendOrder = async (value) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://ecommerce-node4.onrender.com/order",
        value,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Tariq__${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("🦄 your order submitted!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        navigate("/");
      }

      console.log(response);
    } catch (error) {
      if (error.response) {
        console.error("server error", error.response.data);
      } else if (error.request) {
        console.error("no response from server");
      } else {
        console.error("error request", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!order || !order.products || order.products.length === 0) {
    return (
      <div className="container text-center mt-5">
        <h2>No Orders!</h2>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <ToastContainer />
      <h2 className="text-center mb-5">Order Page</h2>
      <Row>
        <div className="col-md-6 col-sm-12">
          <Form
            onSubmit={handleSubmit(handleSendOrder)}
            className={`${style.register} w-100 mt-0`}
          >
            <h2 className="text-white mb-5">Submit Order</h2>

            <FloatingLabel
              controlId="coupon"
              label="Coupon Code (Optional)"
              className={`${style.FloatLabel} mb-3`}
            >
              <Form.Control
                type="text"
                placeholder="Coupon Code"
                {...register("couponName")}
                className={`${style.transparentInput}`}
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="address"
              label="Address"
              className={`${style.FloatLabel} mb-3`}
            >
              <Form.Control
                type="text"
                placeholder="Address"
                {...register("address", { required: "Address is required" })}
                className={`${style.transparentInput}`}
              />
              {errors.address && (
                <div className="invalid-feedback">{errors.address.message}</div>
              )}
            </FloatingLabel>

            <FloatingLabel
              controlId="phone"
              label="Phone Number"
              className={`${style.FloatLabel} mb-3`}
            >
              <Form.Control
                type="tel"
                placeholder="Phone Number"
                {...register("phone", {
                  required: "Phone number is required",
                })}
                className={`${style.transparentInput}`}
              />
              {errors.phone && (
                <div className="invalid-feedback">{errors.phone.message}</div>
              )}
            </FloatingLabel>

            <Button
              variant="primary"
              type="submit"
              className={`${style.registerbtn}`}
              disabled={IsLoading}
            >
              {IsLoading ? "Submitting..." : "Submit Order"}
            </Button>
          </Form>
        </div>

        <div className="col-md-6 col-sm-12">
          <Table
            hover
            variant="dark"
            className={`table ${shape.tableTransparent}`}
          >
            <thead>
              <tr>
                <th>Image</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Final Price</th>
              </tr>
            </thead>
            <tbody>
              {order?.products?.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                      }}
                    />
                  </td>
                  <td>{item.price} $</td>
                  <td>{item.quantity}</td>
                  <td>{item.total} $</td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" className="text-start fw-bold">
                  Shipping:
                </td>
                <td className="text-end">5 $</td>
              </tr>
              <tr>
                <td colSpan="3" className="text-start fw-bold">
                  Total:
                </td>
                <td className="text-end">
                  {order?.products?.reduce((acc, item) => acc + item.total, 0) +
                    5}{" "}
                  $
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Row>
    </div>
  );
}
