import React, { useEffect, useState } from 'react'
import axios from 'axios';


export default function UseFetch(url) {
 
    const [data, setData] = useState([{ }]);
    const [error, setError] = useState(null);
      const[isLoading,setLOADING]=useState(true)
  
    const getData = async () => {
      try {
        const { data } = await axios.get(url); 
        setData(data);
        setError(null);
       
        console.log(data);
      } catch (error) {
        setError(error.message);
      }finally{
        setLOADING(false);
      }
    };

 useEffect(() => {
getData();
}, []); 



return {data ,error,isLoading}

}

