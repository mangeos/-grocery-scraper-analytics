import React, { memo, useState } from "react";
import { Link } from "react-router-dom";

const Nav = memo(() => {
  const [value, setValue] = useState();
  // Byter titel
  function handleChange(data) {
    //console.log(data);
    if (data === "Protein/Krona") {
      document.getElementById("title").innerHTML = "Protein Per Krona"  
    } else{
      document.getElementById("title").innerHTML = data; 
    }
    setValue(data);
  }
  return (
    <nav>
      <ul>
        <li>
          <Link
            onClick={(e) => handleChange(e.target.innerText)}
            style={{
              textDecoration: value === "Protein/Krona" ? "underline" : "None",
            }}
            to="/"
          >
            Protein/Krona
          </Link>
        </li>
        <li>
          <Link
            onClick={(e) => handleChange(e.target.innerText)}
            style={{
              textDecoration: value === "Statistik" ? "underline" : "None",
            }}
            to="/comp"
          >
            Statistik
          </Link>
        </li>
      </ul>
    </nav>
  );
});

export default Nav;
