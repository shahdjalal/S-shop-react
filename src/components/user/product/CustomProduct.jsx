import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './Products.module.css';

export default function CustomProduct({ products }) {
  const [sortedProducts, setSortedProducts] = useState(products);
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    let sorted = [...products];

    if (sortType === "price-asc") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sortType === "price-desc") {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sortType === "name-asc") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortType === "name-desc") {
      sorted.sort((a, b) => b.name.localeCompare(a.name));
    }

    setSortedProducts(sorted);
  }, [sortType, products]);

  return (
    <div className="container text-white mt-5 mb-5">
      {/* العنوان في المنتصف والفرز على اليمين */}
      <div className="d-flex justify-content-between align-items-center position-relative mb-3">
        <h1 className={`w-100 text-center ${style.title}`}>Products</h1>
        <div className="">
          <label className="me-2">Sort by:</label>
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="form-select form-select-sm w-50 d-inline-block"
          >
            <option value="">Default</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
      </div>

      {sortedProducts.length > 0 ? (
        <div className="row gap-4 m-2 justify-content-evenly">
          {sortedProducts.map((product) => (
            <div
              key={product._id}
              className={`col-lg-3 col-md-4 col-sm-6 col-xs-12 d-flex flex-column justify-content-between gap-3 ${style.product} p-3 mb-5 border border-light-subtle`}
            >
              <img
                src={product.mainImage?.secure_url || 'https://via.placeholder.com/150'}
                alt={product.name}
                className="img-fluid"
              />
              <h4>{product.name}</h4>
              <p className={`${style.price}`}>Price: {product.price}$</p>
              <Link to={`/products/${product._id}`} >
                Details
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <h4 className="text-center">No products available</h4>
      )}
    </div>
  );
}
