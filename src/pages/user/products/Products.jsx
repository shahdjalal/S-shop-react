import React from 'react'
import UseFetch from '../../../components/user/hooks/UseFetch';
import Loading from '../../../components/user/loading/Loading';
import { Link } from 'react-router-dom';
import CustomProduct from '../../../components/user/product/CustomProduct';

export default function Products() {
 const {data,error,isLoading}= UseFetch(`https://ecommerce-node4.onrender.com/products?limit=10 `);

  console.log(data);

   if(isLoading){
  
      return <Loading />
    }


  return (
    <>
    
    {error? <div className='alert alert-danger'>{error}</div> : ' '  }
    
 <CustomProduct products={data.products} />
    </>
  )
}
