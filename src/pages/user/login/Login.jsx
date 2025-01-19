import axios from "axios";
import React, { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
      if(response.status==200){
        localStorage.setItem("userToken",response.data.token)
        navigate('/');
      }
    
      console.log(response);
    } catch (error) {
      setServerError(error.response.data.message)

      }finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(registerUser)}>

        {ServerError ? <div className="bg-danger"> {ServerError}</div> :null  }

    

        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className="mb-3"
        >
          <Form.Control
            type="email"
            placeholder=" "
            {...register("email", { required: "email is required" })}
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
          className="mb-3"
        >
          <Form.Control
            type="password"
            placeholder=" "
            {...register("password", { required: "password is required" })}
          />
          {errors.password ? (
            <p className="text-danger">{errors.password.message} </p>
          ) : (
            ""
          )}
        </FloatingLabel>

        <Button type="submit" variant="primary" disabled={IsLoading}>
          {IsLoading ? "Loading..." : "Login"}
        </Button>
      </form>
    </>
  );
}
