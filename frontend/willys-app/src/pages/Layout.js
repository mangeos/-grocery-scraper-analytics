import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./../components/Header";
import Nav from "./../components/Nav";
import AdSense from "./../components/AdSense";
import "./layout.css";

const Layout = () => {

  return (
    <>
      <div
      className="sideMenu elementColor"
      >
        <img src="/graph.png" alt="Graph" width="60" height="60"></img>
        <Nav />
      </div>
      <div className="container">
        <Header />
        <Outlet/>
        <footer className="elementColor">
          <ul>
            <li>Kontakt</li>
            <li>email@email.com</li>
          </ul>
          <ul>
            <li>© 2023</li>
          </ul>
        </footer>
      </div>
      <AdSense />
    </>
  );
};

export default Layout;
