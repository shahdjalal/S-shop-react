import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../components/user/loading/Loading";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Container, Row } from "react-bootstrap";
import style from "./details.module.css";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import myImage from "./shipping.avif";

export default function ProductDetails() {
  const { productId } = useParams();

  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setLOADING] = useState(true);
  const [activeTab, setActiveTab] = useState("home");

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `https://ecommerce-node4.onrender.com/products/${productId}`
      );
      setProduct(data.product);
      setError(null);
      console.log(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLOADING(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {error ? <div className="alert alert-danger">{error}</div> : ""}
      <Container>
        <Row className="gap-2 mt-5 justify-content-around">
          <Card
            style={{ width: "18rem" }}
            className="p-3 border border-light-subtle bg-transparent text-white col-md-4 card"
          >
            <Card.Img
              variant="top"
              src={product.mainImage.secure_url}
              className="rounded-2"
            />
            <Card.Body className="d-flex flex-column gap-3">
              <Card.Title>{product.name}</Card.Title>
              <Card.Text className={`${style.price}`}>
                price : {product.price} $
              </Card.Text>
              <Button variant="primary" className={`${style.btn}`}>
                Add to Cart
              </Button>
            </Card.Body>
          </Card>

          <div className="col-md-8">
            <h2>Description : </h2>
            <p>{product.description}</p>

            <h2>Images : </h2>
            {product.subImages.map((image) => (
              <img
                className={`${style.subimg} rounded-3`}
                src={image.secure_url}
                alt={image.filename}
              />
            ))}
          </div>
        </Row>

        <Tabs
          id="fill-tab-example"
          activeKey={activeTab}
          onSelect={(key) => setActiveTab(key)} // تعيين الـ active tab
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
            <div className={`${style.tabContent}  text-center`}>
              <h3>REVIEWS</h3>
              {product.reviews.map((review) => (
                <div key={review._id}>
                  <span>{review.createdBy.userName} : </span>
                  <span>{review.comment}</span>
                </div>
              ))}
            </div>
          </Tab>
          <Tab
            eventKey="longer-tab"
            title={
              <span
                className={
                  activeTab === "longer-tab"
                    ? style.navLinkActive
                    : style.navLink
                }
              >
                Shipping & Delivery
              </span>
            }
          >
            <div className={`${style.tabContent}`}>
              <h3 className="text-center">DELIVERY</h3>
              <Row>
                <img src={myImage} className="col-md-4 w-25" alt="Delivery" />
                <p className="col-md-8">
                  Vestibulum curae torquent diam diam commodo parturient
                  penatibus nunc dui adipiscing convallis bulum parturient
                  suspendisse parturient a.Parturient in parturient scelerisque
                  nibh lectus quam a natoque adipiscing a vestibulum hendrerit
                  et pharetra fames.Consequat net Vestibulum parturient
                  suspendisse parturient a.Parturient in parturient scelerisque
                  nibh lectus quam a natoque adipiscing a vestibulum hendrerit
                  et pharetra fames.Consequat netus. Scelerisque adipiscing
                  bibendum sem vestibulum et in a a a purus lectus faucibus
                  lobortis tincidunt purus lectus nisl class eros.Condimentum a
                  et ullamcorper dictumst mus et tristique elementum nam
                  inceptos hac vestibulum amet elit{" "}
                </p>
              </Row>
            </div>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
}
