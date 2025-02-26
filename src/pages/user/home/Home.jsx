import React, { useRef } from "react";
import { Container, Row } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import style from "./home.module.css";
import UseFetch from "../../../components/user/hooks/UseFetch";
import Loading from "../../../components/user/loading/Loading";
import CustomProduct from "../../../components/user/product/CustomProduct";
import { Link } from "react-router-dom";

export default function Home() {
  // مرجع للسلايدر الأول (Hero)
  const heroCarouselRef = useRef(null);
  const nextHeroSlide = () => heroCarouselRef.current.next();
  const prevHeroSlide = () => heroCarouselRef.current.prev();

  // مرجع للسلايدر الثاني (Product)
  const productCarouselRef = useRef(null);
  const nextProductSlide = () => productCarouselRef.current.next();
  const prevProductSlide = () => productCarouselRef.current.prev();

  const { data, error, isLoading } = UseFetch(
    `https://ecommerce-node4.onrender.com/products?limit=3 `
  );

  console.log(data);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div
        className={`${style.hero} vh-100 d-flex align-items-center position-relative`}
      >
        <Container>
          <button
            onClick={prevHeroSlide}
            className={`${style.arrow} ${style.leftArrow}`}
          >
            ❮
          </button>
          <button
            onClick={nextHeroSlide}
            className={`${style.arrow} ${style.rightArrow}`}
          >
            ❯
          </button>
          <Carousel
            ref={heroCarouselRef}
            className={`${style.slider} `}
            controls={false}
            indicators={false}
            interval={1000}
          >
            <Carousel.Item>
              <Row className="gap-4">
                <div
                  className={`col-md-5 col-sm-12 ${style.main} d-flex flex-column gap-3 justify-content-md-start pt-5 align-items-start`}
                >
                  <h6 className={`${style.title}`}>Latest brand name</h6>
                  <h1 className="text-3xl md:text-5xl">LATEST SMARTPHONE</h1>
                  <p className="mt-4 text-sm md:text-base text-gray-300">
                    Experience cutting-edge technology with the new ultra-fast
                    processor and stunning display.
                  </p>
                  <Link
                    to="/products"
                    className={`${style.Btn} btn mt-6 border-2 border-white text-white px-5 py-2 text-lg hover:bg-white hover:text-black transition`}
                  >
                    SHOP NOW
                  </Link>
                </div>
                <div className="col-md-6 col-sm-12 d-flex justify-content-center p-4 text-center">
                  <img
                    src="/mobile.PNG"
                    alt="Smartphone"
                    className={`${style.mainImg}`}
                  />
                </div>
              </Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row className="gap-4">
                <div
                  className={`col-md-5 col-sm-12 ${style.main} d-flex flex-column gap-3 justify-content-md-start pt-5 align-items-start`}
                >
                  <h6 className={`${style.title}`}>Latest brand name</h6>
                  <h1 className="text-3xl md:text-5xl">LATEST KIDS GAMES</h1>
                  <p className="mt-4 text-sm md:text-base text-gray-300">
                    Experience endless fun and creativity with our new range of
                    interactive games. Designed with safety and learning in
                    mind, these games provide a colorful world of adventure that
                    inspires and entertains children.
                  </p>
                  <Link
                    to="/products"
                    className={`${style.Btn} btn mt-6 border-2 border-white text-white px-5 py-2 text-lg hover:bg-white hover:text-black transition`}
                  >
                    SHOP NOW
                  </Link>
                </div>
                <div className="col-md-6 col-sm-12 d-flex justify-content-center p-4 text-center">
                  <img
                    src="/toy.png"
                    alt="Smartphone"
                    className={`${style.mainImg}`}
                  />
                </div>
              </Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row className="gap-4">
                <div
                  className={`col-md-5 col-sm-12 ${style.main} d-flex flex-column gap-3 justify-content-md-start pt-5 align-items-start`}
                >
                  <h6 className={`${style.title}`}>Latest brand name</h6>
                  <h1 className="text-3xl md:text-5xl">LATEST SMARTPHONE</h1>
                  <p className="mt-4 text-sm md:text-base text-gray-300">
                    Experience cutting-edge technology with the new ultra-fast
                    processor and stunning display.
                  </p>
                  <Link
                    to="/products"
                    className={`${style.Btn} btn mt-6 border-2 border-white text-white px-5 py-2 text-lg hover:bg-white hover:text-black transition`}
                  >
                    SHOP NOW
                  </Link>
                </div>
                <div className="col-md-6 col-sm-12 d-flex justify-content-center p-4 text-center">
                  <img
                    src="/mobile2.PNG"
                    alt="Smartphone"
                    className={`${style.mainImg}`}
                  />
                </div>
              </Row>
            </Carousel.Item>
          </Carousel>
        </Container>
      </div>

      <section
        className={`${style.ProductSwiper} mt-5 mb-5 position-relative `}
      >
        <Container>
          <div className="d-flex align-items-center justify-content-betwwen flex-column">
            <h6 className={`${style.title} `}>This is custom subtitle</h6>
            <h2>SHAHD DARK LAYOUT</h2>
            <h4>__ x __</h4>
          </div>
          <button
            onClick={prevProductSlide}
            className={`${style.arrow} ${style.leftArrow}`}
          >
            ❮
          </button>
          <button
            onClick={nextProductSlide}
            className={`${style.arrow} ${style.rightArrow}`}
          >
            ❯
          </button>
          <Carousel
            ref={productCarouselRef}
            interval={null}
            indicators={false}
            controls={false}
            className="h-100 p-5"
          >
            <Carousel.Item>
              <Row className="gap-5 justify-content-center">
                <div
                  className={`${style.product} col-md-5 col-sm-12 px-3  py-3 d-flex flex-column gap-2 justify-content-center align-items-start`}
                >
                  <h6 className={` ${style.subTitle}`}>
                    This is custom subtitle
                  </h6>
                  <h4>SMARTPHONE</h4>
                  <h4 className={`  ${style.price}`}>1500$</h4>
                  <Link to='/products' className="mt-6 border-2 btn border-white text-white px-3 py-2  text-lg hover:bg-white hover:text-black transition">
                    SHOP NOW
                  </Link>
                </div>
                <div
                  className={`${style.product} col-md-5 col-sm-12 px-3 py-4 d-flex flex-column gap-2 justify-content-center align-items-start`}
                >
                  <h6 className={`  ${style.subTitle}`}>
                    This is custom subtitle
                  </h6>
                  <h4>SMARTPHONE</h4>
                  <h4 className={`  ${style.price}`}>1500$</h4>
                  <Link to='/products' className="mt-6 border-2 btn border-white text-white px-3 py-2  text-lg hover:bg-white hover:text-black transition">
                    SHOP NOW
                  </Link>
                </div>
              </Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row className="gap-5 justify-content-center">
                <div
                  className={`${style.product} col-md-5 col-sm-12 px-3  py-4 d-flex flex-column gap-2 justify-content-center align-items-start`}
                >
                  <h6 className={` ${style.subTitle}`}>
                    This is custom subtitle
                  </h6>
                  <h4>SMARTPHONE</h4>
                  <h4 className={`  ${style.price}`}>1500$</h4>
                  <Link to='/products' className="mt-6 border-2 btn border-white text-white px-3 py-2  text-lg hover:bg-white hover:text-black transition">
                    SHOP NOW
                  </Link>
                </div>
                <div
                  className={`${style.product} col-md-5 col-sm-12 px-3 py-4 d-flex flex-column gap-2 justify-content-center align-items-start`}
                >
                  <h6 className={`  ${style.subTitle}`}>
                    This is custom subtitle
                  </h6>
                  <h4>SMARTPHONE</h4>
                  <h4 className={`  ${style.price}`}>1500$</h4>
                  <Link to='/products' className="mt-6 border-2 btn border-white text-white px-3 py-2  text-lg hover:bg-white hover:text-black transition">
                    SHOP NOW
                  </Link>
                </div>
              </Row>
            </Carousel.Item>
            <Carousel.Item>
              <Row className="gap-5 justify-content-center">
                <div
                  className={`${style.product} col-md-5 col-sm-12 px-3  py-4 d-flex flex-column gap-2 justify-content-center align-items-start`}
                >
                  <h6 className={` ${style.subTitle}`}>
                    This is custom subtitle
                  </h6>
                  <h4>SMARTPHONE</h4>
                  <h4 className={`  ${style.price}`}>1500$</h4>
                  <Link to='/products' className="mt-6 border-2 btn border-white text-white px-3 py-2  text-lg hover:bg-white hover:text-black transition">
                    SHOP NOW
                  </Link>
                </div>
                <div
                  className={`${style.product} col-md-5 col-sm-12 px-3 py-4 d-flex flex-column gap-2 justify-content-center align-items-start`}
                >
                  <h6 className={`  ${style.subTitle}`}>
                    This is custom subtitle
                  </h6>
                  <h4>SMARTPHONE</h4>
                  <h4 className={`  ${style.price}`}>1500$</h4>
                  <Link to='/products' className="mt-6 border-2 border-white text-white px-3 py-2 btn text-lg hover:bg-white hover:text-black transition">
                    SHOP NOW
                  </Link>
                </div>
              </Row>
            </Carousel.Item>
          </Carousel>
        </Container>
      </section>

      <section className={`${style.products} text-center`}>
        <Container>
          <div className="d-flex align-items-center justify-content-betwwen flex-column">
            <h6 className={`${style.title}`}>Check out latest of</h6>
            <h2>BRAND NEW PRODUCTS</h2>
            <h4>__ x __</h4>
          </div>

          {error ? <div className="alert alert-danger">{error}</div> : " "}

          <CustomProduct products={data.products} />

          <Link
            to="/products"
            className={`${style.productBtn} btn mt-6 border-2 border-white text-white px-5 py-3 text-lg hover:bg-white hover:text-black transition`}
          >
            View all Products
          </Link>
        </Container>
      </section>

      <section className={`${style.testimonials} text-center py-5`}>
        <Container>
          <div className="d-flex align-items-center justify-content-betwwen flex-column">
            <h6 className={`${style.title}`}>What people say about us</h6>
            <h2>CLIENTS OPINIONS</h2>
            <h4>__ x __</h4>
          </div>

          <Row className="mt-5 justify-content-center">
            <div className="col-md-4 col-sm-6 mb-4">
              <div className={`${style.testimonialBox} px-3 py-4 text-center`}>
                <img
                  src="/client1.webp"
                  alt="Person1"
                  className="rounded-circle mb-3 mx-auto d-block"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
                <p className="mt-2">
                  Elit ac parturient scelerisque vitae integer erat molestie per
                  nullam metus sed in a penatibus litora vestibulum conubia
                  consequat suspendisse malesuada.
                </p>
                <h5 className="mt-3">Doe </h5>
                <span>Happy Customer</span>
              </div>
            </div>

            <div className="col-md-4 col-sm-6 mb-4">
              <div className={`${style.testimonialBox} px-3 py-4 text-center`}>
                <img
                  src="/client2.webp"
                  alt="Person2"
                  className="rounded-circle mb-3 mx-auto d-block"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
                <p className="mt-2">
                  Elit ac parturient scelerisque vitae integer erat molestie per
                  nullam metus sed in a penatibus litora vestibulum conubia
                  consequat suspendisse malesuada.
                </p>
                <h5 className="mt-3">Sarah Connor </h5>
                <span>Happy Customer</span>
              </div>
            </div>

            <div className="col-md-4  col-sm-6 mb-4">
              <div className={`${style.testimonialBox} px-3 py-4 text-center`}>
                <img
                  src="/client3.webp"
                  alt="Person3"
                  className="rounded-circle mb-3 mx-auto d-block"
                  style={{ width: "80px", height: "80px", objectFit: "cover" }}
                />
                <p className="mt-2">
                  Elit ac parturient scelerisque vitae integer erat molestie per
                  nullam metus sed in a penatibus litora vestibulum conubia
                  consequat suspendisse malesuada.
                </p>
                <h5 className="mt-3">John Doe </h5>
                <span>Happy Customer</span>
              </div>
            </div>
          </Row>
        </Container>
      </section>

      <div className={style.myAccessoriesSection}>
        <Container>
          <Row>
            <div className={`${style.imageStory} col-md-6 mb-4 mb-md-0`}>
              <div
                className={`${style.imagesWrapper} d-flex  gap-3 justify-content-center align-items-center`}
              >
                <img
                  src="/toy.png"
                  alt="Ring1"
                  className={style.productImageLarge}
                />
              </div>
            </div>

            <div className={`${style.Story} col-md-6 mb-4 mb-md-0 text-center`}>
              <div className="d-flex align-items-center justify-content-betwwen flex-column">
                <h6 className={`${style.title}`}>S&Shop store</h6>
                <h2>OUR PARTNERS</h2>
                <h4>__ x __</h4>
              </div>

              <p className={style.sectionText}>
                Duis senectus condimentum a fringilla donec non adipiscing
                nullam posuere eros ac turpis mi lectus nunc congue vestibulum.
                Facilisis lobortis cursus morbi sociosqu tortor condimentum
                elementum at a conubia vestibulum adipiscing pretium fringilla
                sit a habitant sed a dui mauris.
              </p>
              <button
                className={`${style.storyButton} btn mt-3 border-2 border-white text-white px-5 py-3`}
              >
                READ OUR STORY
              </button>
            </div>
          </Row>
        </Container>
      </div>
    </>
  );
}
