import React, { useState, useEffect } from "react";
import UseFetch from "../../../components/user/hooks/UseFetch";
import Loading from "../../../components/user/loading/Loading";
import CustomProduct from "../../../components/user/product/CustomProduct";
import { MdOutlineNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";

export default function Products() {
  const [page, setPage] = useState(1);
  const limit = 6;
  const [totalPages, setTotalPages] = useState(1); 
  const [products, setProducts] = useState([]);

  
  const { data, isLoading, error } = UseFetch(
    `https://ecommerce-node4.onrender.com/products?page=${page}&limit=${limit}`
  );


  useEffect(() => {
    if (data && data.products) {
      setProducts(data.products);
      setTotalPages(Math.ceil((data.total || 1) / limit)); 
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mt-5">
      {error && <div className="alert alert-danger">{error}</div>}

      
      <CustomProduct products={products} />

  {/* pagination */}
      {products.length > 0 && (
        <div className="d-flex justify-content-center mt-4">
          <button
            className="btn m-1"
            disabled={page === 1} 
            onClick={() => setPage((prev) => prev - 1)}
            style={{ backgroundColor: "#bc9c72 " }}
          >
            <GrFormPrevious />
          </button>
          <span className="align-self-center mx-3">
            Page {page} of {totalPages}
          </span>
          <button
            className="btn m-1"
            disabled={page >= totalPages} 
            onClick={() => setPage((prev) => prev + 1)}
            style={{ backgroundColor: "#bc9c72 " }}
          >
            <MdOutlineNavigateNext />
          </button>
        </div>
      )}
    </div>
  );
}
