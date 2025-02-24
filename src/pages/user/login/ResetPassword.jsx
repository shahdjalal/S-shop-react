import axios from "axios";
import React, { useState } from "react";
import { Container, FloatingLabel, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import style from "../register/register.module.css";
import { toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [code, setCode] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState(null);
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const reset = async () => {
        try {
            setIsLoading(true);
            setServerError(null);

            const response = await axios.patch(
                `https://ecommerce-node4.onrender.com/auth/sendcode`,
                {
                    email: email,
                    password: password,
                    code: code,
                }
            );

            console.log(" Response Data:", response.data);

           if (response.status === 200) {
                 
                  toast.success('password reset successfully', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
          
                  setTimeout(() => {
                    navigate("/auth/login");
                  }, 2000);
                
              }
                console.log(response.data);
                
                  } catch (error) {
                    toast.error('Error while reset password', {
                      position: "top-right",
                      autoClose: 5000,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    });
                  
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Container>

<ToastContainer />
            <form onSubmit={handleSubmit(reset)} className={`${style.register}`}>
                {serverError && (
                    <div className="bg-danger text-white p-2">{serverError}</div>
                )}

                <h1 className="text-white mb-5">Forgot Your Password?</h1>

        
                <FloatingLabel controlId="floatingInput" label="Email address" className={`${style.FloatLabel} mb-3`}>
                    <Form.Control
                               type="email"
                               placeholder=" "
                               {...register("email", { required: "email is required" })}
                               value={email}  
                     onChange={(e) => setEmail(e.target.value)}
                               className={`${style.transparentInput}`}
                             />
                    {errors.email && <p className="text-danger">{errors.email.message}</p>}
                </FloatingLabel>

           
                <FloatingLabel controlId="floatingPassword" label="New Password" className={`${style.FloatLabel} mb-3`}>
                    <Form.Control
                        type="password"
                        placeholder=" "
                        {...register("password", { required: "Password is required" })}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                       
                        className={`${style.transparentInput}`}
                    />
                    {errors.password && <p className="text-danger">{errors.password.message}</p>}
                </FloatingLabel>

               
                <FloatingLabel controlId="floatingCode" label="Verification Code" className={`${style.FloatLabel} mb-3`}>
                    <Form.Control
                        type="text"
                        placeholder=" "
                        {...register("code", { required: "Verification code is required" })}
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                       
                        className={`${style.transparentInput}`}
                    />
                    {errors.code && <p className="text-danger">{errors.code.message}</p>}
                </FloatingLabel>

            
                <Button type="submit" variant="primary" disabled={isLoading} className={`${style.registerbtn}`}>
                    {isLoading ? "Loading..." : "Reset Password"}
                </Button>

                <hr className={`${style.line}`} />

                <p>Enter a new password to change your password</p>
            </form>
        </Container>
    );
}
