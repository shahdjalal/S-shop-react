import React from 'react'
import { Link, useParams } from 'react-router-dom';
import style from './Products.module.css'

export default function CustomProduct({ products }) {

 
          
  return (
    <>
 
 <div className='container text-white mt-5 mb-5'>
      <h1  className={`text-center m-5 ${style.title}`}>Products</h1>
      <div className='row gap-4 justify-content-evenly'>
        {products.map(product => (
          <div
            key={product._id}
            className={`col-lg-3 col-md-4 col-sm-6 col-xs-12 d-flex flex-column gap-3 ${style.product} p-3 mb-5  border border-light-subtle` }>
            <img src={product.mainImage.secure_url} alt={product.name} />
            <h4>{product.name}</h4>
            <p className={`${style.price}`}>Price: {product.price}$</p>
            <Link to={`/products/${product._id}`}>Details</Link>
          </div>
        ))}
      </div>
    </div>

    
    
    
    
    
    </>
  )
}
