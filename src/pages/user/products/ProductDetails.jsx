import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../../components/user/loading/Loading";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Row, Col } from "react-bootstrap"; // تم استيراد Col هنا
import style from "./details.module.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import myImage from "./shipping.avif";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaRegStar } from "react-icons/fa";

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setLOADING] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [isADD, setIsAdd] = useState(false);
  const [avg, setAvg] = useState({});
  // States خاصة بالفورم
  const [reviewRating, setReviewRating] = useState("");
  const [reviewComment, setReviewComment] = useState("");

  const addToCart = async (productId) => {
    try {
      setIsAdd(true);
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        `https://ecommerce-node4.onrender.com/cart`,
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Product added to cart successfully", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          navigate("/cart");
        }, 1000);
      }
    } catch (error) {
      console.log("error", error);
      toast.error("Error adding product to cart", {
        position: "top-right",
        autoClose: 5000,
      });
      setIsAdd(false);
    }
  };

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-node4.onrender.com/products/${productId}`
      );
      setProduct(data.product);
      setAvg(data);
      setError(null);
      console.log(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLOADING(false);
      setIsAdd(false);
    }
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // دالة لإرسال الريفيو
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.post(
        `https://ecommerce-node4.onrender.com/products/${productId}/review`,
        {
          rating: reviewRating,
          comment: reviewComment,
        },
        {
          headers: {
            Authorization: `Tariq__${token}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Review added successfully", {
          position: "top-right",
          autoClose: 3000,
        });
        // تحديث بيانات المنتج بعد الإضافة
        getData();
        setReviewRating("");
        setReviewComment("");
      }
    } catch (error) {
      console.log("Review submit error:", error);
      toast.error("Error submitting review", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {error ? <div className="alert alert-danger">{error}</div> : ""}
      <Container>
        <ToastContainer />
        <Row className="gap-2 mt-5 justify-content-around gap-3">
          <Card
            style={{ width: "20rem" }}
            className="p-3 border border-light-subtle bg-transparent text-white col-lg-4 col-md-12 card"
          >
            <Card.Img
              variant="top"
              src={product.mainImage.secure_url}
              className="rounded-2"
              alt={product.name}
            />
            <Card.Body className="d-flex flex-column gap-3">
              <h2 className={`${style.price}`}>
                Price:{" "}
                <span className="text-secondary">
                  <del>{product.price}</del>
                </span>{" "}
                {product.finalPrice} $
              </h2>
              <Button
                variant="primary"
                className={`${style.btn}`}
                onClick={() => addToCart(product._id)}
                disabled={isADD}
              >
                {isADD ? "Adding to Cart..." : "Add to Cart"}
              </Button>
            </Card.Body>
          </Card>

          <div className="col-lg-7 col-md-12 d-flex flex-column gap-4">
            <h2>{product.name}</h2>
            <div>
              <h4>Images:</h4>
              {product.subImages.map((image) => (
                <img
                  key={image.public_id}
                  className={`${style.subimg} rounded-3`}
                  src={image.secure_url}
                  alt={image.filename}
                />
              ))}
            </div>
            <h4 className={`${style.price}`}>
              Average Rating: {avg.avgRating.toFixed(1)}
            </h4>
          </div>
        </Row>

        <Tabs
          id="fill-tab-example"
          activeKey={activeTab}
          onSelect={(key) => setActiveTab(key)}
          className="mb-3"
          fill
        >
          <Tab
            eventKey="home"
            title={
              <span
                className={
                  activeTab === "home" ? style.navLinkActive : style.navLink
                }
              >
                Description
              </span>
            }
          >
            <div className={`${style.tabContent} text-center`}>
              <h3 className="text-center">PRODUCT DESCRIPTION</h3>
              <p>{product.description}</p>
            </div>
          </Tab>

          <Tab
            eventKey="profile"
            title={
              <span
                className={
                  activeTab === "profile" ? style.navLinkActive : style.navLink
                }
              >
                Reviews
              </span>
            }
          >
            <div className={`${style.tabContent}`}>
            <h3 className="text-center">REVIEWS</h3>
              <Row className="justify-content-between">
              <Col md={4}>
                  <h4 style={{ color: "#bc9c72", textAlign: "center" }}>
                    Add Your Review
                  </h4>
                  <form onSubmit={handleReviewSubmit}>
                    <div className="mb-3 text-start">
                      <label htmlFor="rating" className="form-label">
                        Rating
                      </label>
                      <select
                        id="rating"
                        className="form-select"
                        value={reviewRating}
                        onChange={(e) => setReviewRating(e.target.value)}
                        required
                      >
                        <option value="">Select Rating</option>
                        <option value="1">1 star</option>
                        <option value="2">2 stars</option>
                        <option value="3">3 stars</option>
                        <option value="4">4 stars</option>
                        <option value="5">5 stars</option>
                      </select>
                    </div>
                    <div className="mb-3 text-start">
                      <label htmlFor="comment" className="form-label">
                        Comment
                      </label>
                      <textarea
                        id="comment"
                        className="form-control"
                        rows="3"
                        value={reviewComment}
                        onChange={(e) => setReviewComment(e.target.value)}
                        required
                      ></textarea>
                    </div>
                    <Button
                      type="submit"
                      variant="primary"
                      style={{ backgroundColor: "#bc9c72" }}
                    >
                      Submit Review
                    </Button>
                  </form>
                </Col>
               
                <Col md={6} >
                <h4 style={{ color: "#bc9c72", textAlign: "center" }}>
                  Clients Reviews
                  </h4>
                  {product.reviews.map((review) => (
                    <div key={review._id} className="mb-2 text-center">
                      <strong>{review.createdBy.userName}:</strong>{" "}
                      <span>{review.comment}</span> -{" "}
                      {/* <span>{review.rating} </span> */}
                    </div>
                  ))}
                </Col>
                {/* عمود الفورم */}
               
              </Row>
            </div>
          </Tab>

          <Tab
            eventKey="longer-tab"
            title={
              <span
                className={
                  activeTab === "longer-tab" ? style.navLinkActive : style.navLink
                }
              >
                Shipping & Delivery
              </span>
            }
          >
            <div className={`${style.tabContent}`}>
              <h3 className="text-center">DELIVERY</h3>
              <Row>
                <img
                  src={myImage}
                  className="col-md-4 w-25"
                  alt="Delivery"
                />
                <p className="col-md-8">
                  Vestibulum curae torquent diam diam commodo parturient penatibus nunc dui adipiscing convallis bulum parturient suspendisse parturient a. Parturient in parturient scelerisque nibh lectus quam a natoque adipiscing a vestibulum hendrerit et pharetra fames. Consequat net Vestibulum parturient suspendisse parturient a. Parturient in parturient scelerisque nibh lectus quam a natoque adipiscing a vestibulum hendrerit et pharetra fames. Consequat netus. Scelerisque adipiscing bibendum sem vestibulum et in a a a purus lectus faucibus lobortis tincidunt purus lectus nisl class eros. Condimentum a et ullamcorper dictumst mus et tristique elementum nam inceptos hac vestibulum amet elit.
                </p>
              </Row>
            </div>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}
