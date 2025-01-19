import axios from "axios";
import React, { useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
     
      if(error.response.status==409){
        setServerError("Email already exists")
      }else{
        setServerError(error.response.data.message)
      }



    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(registerUser)}>

        {ServerError ?? <div className="bg-danger"> {ServerError}</div>  }

       
        <FloatingLabel
          controlId="floatingInput"
          label="user name "
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder=" "
            {...register("userName", { required: "username is required" })}
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
          {IsLoading ? "Loading..." : "Register"}
        </Button>
      </form>
    </>
  );
}
