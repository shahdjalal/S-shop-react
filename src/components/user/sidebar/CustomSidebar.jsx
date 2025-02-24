import React, { useState, useEffect } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import style from "./sidebar.module.css";
import { BiCollapse } from "react-icons/bi";
import { IoExpandOutline } from "react-icons/io5";
import { FaUser, FaImage, FaShoppingCart } from "react-icons/fa";

export default function CustomSidebar() {

    const [isCollapse, setIsCollapse] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  
    useEffect(() => {
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    const toggleCollapse = () => setIsCollapse(!isCollapse);
  
    return (
      <>
      
       
        {!isMobile && (
          <Sidebar
            className={style.sidebar}
            collapsed={isCollapse}
            style={{ backgroundColor: "#bc9c72", opacity: "1" }}
          >
            {isCollapse ? (
              <IoExpandOutline onClick={toggleCollapse} className={style.collapse} />
            ) : (
              <BiCollapse onClick={toggleCollapse} className={style.collapse} />
            )}
  
            <Menu>
              <MenuItem component={<Link to="/profile/info" />}>Info</MenuItem>
              <MenuItem component={<Link to="/profile/image" />}>Image</MenuItem>
              <MenuItem component={<Link to="/profile/orders" />}>Orders</MenuItem>
            </Menu>
          </Sidebar>
        )}
  
        
        {isMobile && (
          <div className={style.mobileNav}>
            <Link to="/profile/info" className={style.navItem}>
              <FaUser className={style.icon} />
              <span>Info</span>
            </Link>
            <Link to="/profile/image" className={style.navItem}>
              <FaImage className={style.icon} />
              <span>Image</span>
            </Link>
            <Link to="/profile/orders" className={style.navItem}>
              <FaShoppingCart className={style.icon} />
              <span>Orders</span>
            </Link>
          </div>
        )}
      </>
    );
  }
  