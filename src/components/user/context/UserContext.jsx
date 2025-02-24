import axios from "axios";
import { Children, useEffect, useState } from "react";
import { createContext } from "react";
import Loading from "../loading/Loading";

export const UserContext=createContext();

export const UserContextProvider = ({children})=>{

    const [user,setUser]=useState(null);
      const [isLoading, setLOADING] = useState(true);

useEffect( ()=>{
    getUser()
} ,[])
    const getUser = async()=>{

        const token = localStorage.getItem('userToken');

        try{

            const response = await axios.get('https://ecommerce-node4.onrender.com/user/profile', {
                headers: {
                    Authorization: `Tariq__${token}`
                }
            });

setUser(response.data.user);
console.log(response.data)

        }catch(e){

            console.log("error fetching user data",e)
setUser(null);
        }finally{
            setLOADING(false);
        }
    }

    return <UserContext.Provider value={{user,isLoading,setUser}}> 
    
    {children}
    
    
      </UserContext.Provider>
}

export default UserContextProvider;