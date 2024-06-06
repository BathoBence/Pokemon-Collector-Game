import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import logo from '../../../Images/logo.png';
import './Layout.css'

const Layout = () => {

  const navigate = useNavigate();

  return (
    <div className="layout">
      <div className="header">
        <div className="title_container">
        <Link to='/'><img src={logo}></img></Link>
          <Link to='/'><h2 className="title">Poke-Mongo</h2></Link>
        </div>
        <div className="header_button_container">
          <button className="layout_button" onClick={() => navigate("/register")}>Sign up</button>
          <button className="layout_button" onClick={() => navigate("/login")}>Login</button>
        </div>
      </div>
      <div className="body_container">
        <div className="content"><Outlet /></div>
      </div>
    </div>
  )
}

export default Layout;

