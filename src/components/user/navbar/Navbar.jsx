import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import navbar from "./navbar.module.css";

export default function CustomNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); 

  const handleScroll = () => {
    const offset = window.scrollY;
    setScrolled(offset > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

 
  const isActive = (path) => location.pathname === path;

  return (
    <Navbar
      expand="lg"
      className={`${navbar.nav} ${
        scrolled ? navbar.scrolled : ""
      } bg-body-tertiary position-sticky top-0 d-flex justify-content-between`}
    >
      <Container>
        <Navbar.Brand  className={`${navbar.logo}`}>
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
              shop
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
          </div>
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to={"/auth/login"}
              className={`${navbar.btn} ${isActive("/auth/login") ? navbar.active : ""}`}
            >
              Login
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/auth/register"}
              className={`${navbar.btn} ${
                isActive("/auth/register") ? navbar.active : ""
              }`}
            >
              Register
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
