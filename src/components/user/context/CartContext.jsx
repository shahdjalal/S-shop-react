import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

const CartContextProvider = ({children})=>{

    const [cartCount, setcartCount] = useState(0);

useEffect(()=>{

    getCart();
},[ ]);

const getCart = async()=>{

    const token = localStorage.getItem("userToken");
    const response = await axios.get(`https://ecommerce-node4.onrender.com/cart`,

{
    headers:{
        Authorization: `Tariq__${token}`
      }} 
    
    );

    console.log(response);
    setcartCount(response.data.count);
}





return <CartContext.Provider value={{cartCount,setcartCount}}>
{children}
</CartContext.Provider>

}


export default CartContextProvider;  //اي حدا بقدر يوصله
