import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./layout.css";

const Layout = () => {
  return (
    <>
      <div
        style={{
          minWidth: "200px",
          backgroundColor: "#2A2D3E",
        }}
      >
        <img src="/graph.png" alt="Graph" width="60" height="60"></img>
        <nav>
          <ul>
            <li>
              <Link to="/">Protein/Krona</Link>
            </li>
            <li>
              <Link to="/comp">Statistik</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="container">
        <header>
          {/* h2, Ska vara dynamisk*/}
          <h2>Protein per krona</h2>
        </header>
        <Outlet />
        <footer>
          <ul>
            <li>Kontakt</li>
            <li>email@email.com</li>
          </ul>
          <ul>
            <li>copyright 2023</li>
          </ul>
        </footer>
      </div>
    </>
  );
};

export default Layout;
