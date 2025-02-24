import React, { useContext, useEffect, useState } from "react";
import { Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import navbar from "./navbar.module.css";
import { CartContext } from "../context/CartContext";
import { UserContext } from "../context/UserContext";
import { FaShoppingBag } from "react-icons/fa";

export default function CustomNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); 
  const { cartCount } = useContext(CartContext);
  const { user, isLoading, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleScroll = () => {
    const offset = window.scrollY;
    setScrolled(offset > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path) => location.pathname === path;

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userToken");
    navigate('/auth/login');
  };

  return (
    <Navbar
      expand="lg"
      className={`${navbar.nav} ${scrolled ? navbar.scrolled : ""} bg-body-tertiary position-sticky top-0 d-flex justify-content-between`}
    >
      <Container>
        <Navbar.Brand className={`${navbar.logo}`}>
          S&Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div className={`${navbar.NavDropdown}`}>
            <Nav.Link
              as={Link}
              to={"/"}
              className={`${navbar.btn} ${isActive("/") ? navbar.active : ""}`}
            >
              Home
            </Nav.Link>

         

            <Nav.Link
              as={Link}
              to={"/products"}
              className={`${navbar.btn} ${isActive("/products") ? navbar.active : ""}`}
            >
              products
            </Nav.Link>

            <Nav.Link
              as={Link}
              to={"/categories"}
              className={`${navbar.btn} ${isActive("/categories") ? navbar.active : ""}`}
            >
              categories
            </Nav.Link>

          

            {/* <Nav.Link
              as={Link}
              to={"/cart"}
              className={`${navbar.btn} ${isActive("/cart") ? navbar.active : ""}`}
            >
              Cart {cartCount}
            </Nav.Link> */}
          </div>
          <Nav className="ms-auto d-flex justify-content-center align-items-center gap-2">
         
          
        

            <Dropdown    className={`${navbar.menue} `}>
              <Dropdown.Toggle variant="success" id="dropdown-basic" className="btn-light text-black ">
                welcome {isLoading ? "...." : (user ? user.userName : "Guest")}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to={'/profile'}>Profile</Dropdown.Item>
                
                <Dropdown.Item as={Link} to={'/auth/register'}>Register</Dropdown.Item>
                <Dropdown.Item  as={Link} to={'/auth/login'}>login</Dropdown.Item>
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Nav.Link
              as={Link}
              to={"/cart"}
              className={`${navbar.btn} ${isActive("/cart") ? navbar.active : ""}`}
            >
               <FaShoppingBag /> {cartCount}
            </Nav.Link>

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
