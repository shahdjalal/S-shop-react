import React from 'react'
import UseFetch from '../../../components/user/hooks/UseFetch';
import Loading from '../../../components/user/loading/Loading';
import { Link } from 'react-router-dom';
import style from './categories.module.css'

export default function Categories() {

  const {data,error,isLoading}= UseFetch(`https://ecommerce-node4.onrender.com/categories/active`);



   if(isLoading){
  
      return <Loading />
    }





  return (
    <>
    
    {error? <div className='alert alert-danger'>{error}</div> : ' '  }

    
    
    <div className='container mt-5'>
      <h1 className={`text-center m-5 ${style.title}`}>Categories</h1>
<div className=' row  mb-3 gap-3 justify-content-evenly'>
    {data.categories.map(category =>
  <Link to={`/categories/${category._id}`} className={`col-lg-3 col-md-4  col-sm-12  border border-light-subtle  rounded `}  >
<div   key={category._id} className={`text-center p-4 ${style.category}`} >
            
          <img src={category.image.secure_url}  /> 
           

          </div>
          </Link>

    )}
    
</div>  
</div> 
    </>
  )
}
