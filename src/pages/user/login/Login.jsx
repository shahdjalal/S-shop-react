import axios from "axios";
import React, { useState } from "react";
import { Container, FloatingLabel, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import style from "C:/react/ecommerce/src/pages/user/register/register.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export default function Login() {
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
        `https://ecommerce-node4.onrender.com/auth/signin`,
        value
      );
      if (response.status == 200) {
        localStorage.setItem("userToken", response.data.token);
        navigate("/");
      }

      console.log(response);
    } catch (error) {
      setServerError(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Container>
      <form
        onSubmit={handleSubmit(registerUser)}
        className={`${style.register}`}
      >
        {ServerError ? <div className="bg-danger"> {ServerError}</div> : null}

        <h1 className="text-white mb-5">Sign In</h1>

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
          {IsLoading ? "Loading..." : "Login"}
        </Button>

        <hr className={`${style.line}`} />

        <FontAwesomeIcon icon={faUser} size="3x" color="white" />
        <h5>Don't have an account yet?</h5>
        <p className={`${style.paragraph}`}>
          Creating an account is quick and easy! By registering, you'll gain
          access to exclusive deals, faster checkout, and the ability to track
          your order history. Fill in the form below to join us and start your
          journey today.
        </p>

        <Link to={"/register"} className={`${style.link}`}>
          Register
        </Link>
      </form>
      </Container>
    </>
  );
}
