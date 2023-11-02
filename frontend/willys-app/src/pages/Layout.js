import { Outlet, Link } from "react-router-dom";
import "./layout.css";

const Layout = () => {
  return (
    <>
      <div className="container">
        <header>
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/weight">Weight</Link>
              </li>
              <li>
                <Link to="weight">Progress</Link>
              </li>
              <li>
                <Link to="/weight">Profile</Link>
              </li>
            </ul>
          </nav>
        </header>
        <Outlet />
        <footer>
          <ul>
            <li>Kontakt</li>
            <li>email@email.com</li>
          </ul>
          <ul style={{ borderLeft: "0.5px solid" }}>
            <li>copyright 2023</li>
          </ul>
        </footer>
      </div>
    </>
  );
};

export default Layout;
