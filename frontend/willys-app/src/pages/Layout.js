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
            <li>testar</li>
            <li>testar</li>
            <li>testar</li>
            <li>testar</li>
          </ul>
        </footer>
      </div>
    </>
  );
};

export default Layout;
