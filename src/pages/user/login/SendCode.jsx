import axios from "axios";
import React, { useState } from "react";
import { Container, FloatingLabel, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import style from "../register/register.module.css";
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

export default function SendCode() {
  const [email, setEmail] = useState("");
  const [IsLoading, setIsLoading] = useState(false);
   const [ServerError, setServerError] = useState(null);
   const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const Code = async () => {
    try {
      setIsLoading(true);
      setServerError(null);
  
      console.log("Email being sent:", email); 
      if (!email) {
        console.error("Email is empty!");
        setServerError("Please enter a valid email.");
        return;
      }
  
      const response = await axios.patch(
        `https://ecommerce-node4.onrender.com/auth/sendcode`,
        { email: email }
      );
      if (response.status === 200) {
       
        toast.info('Check you email', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          navigate("/auth/resetPassword");
        }, 3000);

     
    }
      console.log(response.data);
      
        } catch (error) {
          toast.error('Error while send code', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
          finally {
      setIsLoading(false);
    }
  };
  

  return (
        <Container>
           <ToastContainer />
      <form
        onSubmit={handleSubmit(Code)}
        className={`${style.register}`}
      >
       {ServerError ? <div className="bg-danger text-white p-2"> {ServerError.message} </div> : null}


        <h1 className="text-white mb-5">Forgot Your Password ? </h1>

        <FloatingLabel
          controlId="floatingInput"
          label="Email address"
          className={`${style.FloatLabel} mb-3`}
        >
          <Form.Control
            type="email"
            placeholder=" "
            {...register("email", { required: "email is required" })}
            value={email}  
  onChange={(e) => setEmail(e.target.value)}
            className={`${style.transparentInput}`}
          />
          {errors.email ? (
            <p className="text-danger">{errors.email.message} </p>
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
         {IsLoading ? "Loading..." : "send code"}
        </Button>

        <hr className={`${style.line}`} />

       <p>we'll send you a code reset your password</p>
      


     
      </form>
      </Container> 
  );
}

  
    
 