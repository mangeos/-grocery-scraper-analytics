import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./../components/Header";
import Nav from "./../components/Nav";
import AdSense from "./../components/AdSense";
import "./layout.css";

const Layout = () => {
  function h(data) {
    console.log(data);
  }
  return (
    <>
      <div
        style={{
          minWidth: "200px",
          backgroundColor: "#2A2D3E",
        }}
      >
        <img src="/graph.png" alt="Graph" width="60" height="60"></img>
        <Nav />
      </div>
      <div className="container">
        <Header />
        <Outlet h={h} />
        <footer>
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
