import React from 'react'
import { Link, useParams } from 'react-router-dom';
import UseFetch from '../../../components/user/hooks/UseFetch';
import Loading from '../../../components/user/loading/Loading';

import CustomProduct from '../../../components/user/product/CustomProduct';
export default function CategoryProducts() {

    const {categoryid}=useParams();
    const {data,error,isLoading}= UseFetch(`https://ecommerce-node4.onrender.com/products/category/${categoryid}`);

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
