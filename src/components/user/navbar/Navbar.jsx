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

            <NavDropdown title="Shop" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1" className="dropDownItem">
                Action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3" className="dropDownItem">
                Something
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" className="dropDownItem">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Pages" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1" className="dropDownItem">
                Action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" className="dropDownItem">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3" className="dropDownItem">
                Something
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4" className="dropDownItem">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </div>
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to={"/login"}
              className={`${navbar.btn} ${isActive("/login") ? navbar.active : ""}`}
            >
              Login
            </Nav.Link>
            <Nav.Link
              as={Link}
              to={"/register"}
              className={`${navbar.btn} ${
                isActive("/register") ? navbar.active : ""
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
