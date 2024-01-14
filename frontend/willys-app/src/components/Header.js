import React, { memo } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faMoon, faSun } from '@fortawesome/free-solid-svg-icons'
const Header = memo(() => {
  const handleClick = () => {
    if (document.getElementById("root").style.backgroundColor !== "white") {
      
      document.getElementById("root").style.backgroundColor="white"
    }else{
      document.getElementById("root").style.backgroundColor="#1e222e"
    }
  };
  
  return (
    <header style={{display:"flex", justifyContent: "center", alignItems:"center", gap:"10px"}}>
      {/* h2, Dynamisk titel */}
      <h2 id="title">Protein/Krona</h2>
      <button  
        style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            outline: 'none', // Ta bort fokusramsen vid klick
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }} 
          onClick={() => handleClick()}><FontAwesomeIcon icon={faMoon} />
          <span style={{ color: '#fff', marginTop: '0.5rem' }}>
            Dark Mode
          </span>
        </button>   
    </header>
  );
});

export default Header;
