import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faHouse } from "@fortawesome/free-solid-svg-icons";
const Nav = memo(() => {
  const [value, setValue] = useState();
  // Byter titel
  function handleChange(data) {
  
    document.getElementById("title").innerHTML = data; 
    setValue(data);
  }
  return (
    <nav>
      <ul>
        <li>
          <div style={{display:"flex", flexDirection:"column"}}>
            <FontAwesomeIcon title="Protein/Krona" style={{fontSize:"30px"}} icon={faHouse} />
            <Link
              onClick={(e) => handleChange(e.target.innerText)}
              style={{
                textDecoration: value === "Protein/Krona" ? "underline" : "None", display:"flex", flexDirection:"column"
              }}
              to="/"
            >
              Protein/Krona
            </Link>
          </div>
        </li>
        <li>
            <div style={{display:"flex", flexDirection:"column"}}>

              <FontAwesomeIcon title="Statistik" style={{fontSize:"30px"}} icon={faChartLine} />
          <Link
            onClick={(e) => handleChange(e.target.innerText)}
            style={{
              textDecoration: value === "Statistik" ? "underline" : "None", display:"flex", flexDirection:"column"
            }}
            to="/products"
          >
            Statistik
          </Link>
            </div>
        </li>
      </ul>
    </nav>
  );
});

export default Nav;
