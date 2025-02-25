import axios from "axios";
import React, { useState } from "react";
import { Container, FloatingLabel, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import style from "./register.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const [IsLoading, setIsLoading] = useState(false);
  const [ServerError, setServerError] = useState(null);
  const registerUser = async (value) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `https://ecommerce-node4.onrender.com/auth/signup`,
        value
      );
      if (response.status === 201) {
        toast.info("🦄please check you email!", {
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
        navigate("/login");
      }

      console.log(response);
    } catch (error) {
      if (error.response.status == 409) {
        setServerError("Email already exists");
      } else {
        setServerError(error.response.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Container>
        <ToastContainer />
        <form
          onSubmit={handleSubmit(registerUser)}
          className={`${style.register}`}
        >
          {ServerError ? (
            <div className="bg-danger text-white p-2"> {ServerError}</div>
          ) : null}

          <h1 className="text-white mb-5">Sign Up</h1>
          <FloatingLabel
            controlId="floatingInput"
            label="user name "
            className={`${style.FloatLabel} mb-3`}
          >
            <Form.Control
              type="text"
              placeholder=" "
              {...register("userName", { required: "username is required" })}
              className={`${style.transparentInput}`}
            />

            {errors.userName ? (
              <p className="text-danger">{errors.userName.message} </p>
            ) : (
              ""
            )}
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className={`${style.FloatLabel} mb-3`}
          >
            <Form.Control
              type="email"
              placeholder=" "
              {...register("email", { required: "email is required" })}
              className={`${style.transparentInput}`}
            />
            {errors.email ? (
              <p className="text-danger">{errors.email.message} </p>
            ) : (
              ""
            )}
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="password"
            className={`${style.FloatLabel} mb-3`}
          >
            <Form.Control
              type="password"
              placeholder=" "
              {...register("password", { required: "password is required" })}
              className={`${style.transparentInput}`}
            />
            {errors.password ? (
              <p className="text-danger">{errors.password.message} </p>
            ) : (
              ""
            )}
          </FloatingLabel>

          <Button
            type="submit"
            variant="primary"
            disabled={IsLoading}
            className={`${style.registerbtn}`}
          >
            {IsLoading ? "Loading..." : "Register"}
          </Button>

          <hr className={`${style.line}`} />

          <FontAwesomeIcon icon={faUser} size="3x" color="white" />
          <h5>You have account!</h5>
          <p className={`${style.paragraph}`}>
            If you already have an account with us, you can log in to access
            your order status and history. Simply fill in your credentials
            below, and you'll be able to manage your purchases quickly and
            easily.
          </p>

          <Link to={"/auth/login"} className={`${style.link}`}>
            LogIn
          </Link>
        </form>
      </Container>
    </>
  );
}
