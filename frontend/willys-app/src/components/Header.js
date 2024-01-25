import React, { memo, useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

const Header = memo(() => {
  const [screenMode, setScreenMode] = useState(true);
   const [nu, setNu] = useState(new Date());

  // Uppdatera tiden varje sekund med useEffect
  useEffect(() => {
    const intervalId = setInterval(() => {
      setNu(new Date());
    }, 1000);

    // Rensa upp intervallet när komponenten avmonteras
    return () => clearInterval(intervalId);
  }, []);

  // Hämta datum och tidkomponenter
  const dag = nu.getDate();
  const månad = nu.getMonth() + 1; // Månader är nollindexbaserade
  const år = nu.getFullYear();

  const timme = nu.getHours();
  const minut = nu.getMinutes();
  const sekund = nu.getSeconds();

  // Formatera datum och tid som strängar
  const datumStrang = `${dag}/${månad}/${år}`;
  const klockslagStrang = `${timme}:${minut}:${sekund}`;
  
  const handleClick = () => {
    let rootElement = document.getElementById('root');
    // Hämta alla element på sidan
    let elementsColors = document.getElementsByClassName('elementColor');
    if (rootElement.style.backgroundColor !== "rgb(237, 241, 241)") {

      setScreenMode(false)
      rootElement.style.backgroundColor = "rgb(237, 241, 241)"
      
      // Loopa igenom varje element och ändra deras egenskaper
      for (let i = 0; i < elementsColors.length; i++) {
        // Sätt färg till svart
        elementsColors[i].style.color = 'black';
        elementsColors[i].style.backgroundColor="#FFFFFF"
      }

    } else {
      setScreenMode(true)
      rootElement.style.backgroundColor="#1e222e"
      // Loopa igenom varje element och ändra deras egenskaper
      for (let i = 0; i < elementsColors.length; i++) {
        // Sätt färg till svart
        elementsColors[i].style.color = '#dbdbe0';
        elementsColors[i].style.backgroundColor="#2A2D3E"
      }
    }
  };

  const handleLogin = () => {
    // Skapa en ny div
    let newDiv = document.createElement("div");


    // Ange några egenskaper för den nya div:en (valfritt)
    newDiv.id = "myDiv";
    newDiv.style.color = "blue";
    newDiv.style.padding = "10px";
   

    newDiv.style.position = "absolute";
    newDiv.style.left = "40%";
    newDiv.style.top = "155px";
    newDiv.style.background = "none";
    // newDiv.style.height = "332px";
    // newDiv.style.width = "493px";
    newDiv.style.display = "flex";


    // Skapa de HTML-element som beskrivs med JavaScript
    const loginContainer = document.createElement('div');
    loginContainer.id = 'login-container';
    loginContainer.style.display = "flex";
    loginContainer.style.justifyContent = "center";
    loginContainer.style.alignItems = "center";
    loginContainer.style.flexDirection = "column";

    const loginHeader = document.createElement('div');
    loginHeader.id = 'login-header';
    loginHeader.innerHTML = '<h2>Login</h2>';

    const loginForm = document.createElement('form');
    loginForm.id = 'login-form';

    const usernameLabel = document.createElement('label');
    usernameLabel.htmlFor = 'username';
    usernameLabel.textContent = 'Användarnamn:';

    const usernameInput = document.createElement('input');
    usernameInput.type = 'text';
    usernameInput.id = 'username';
    usernameInput.name = 'username';
    usernameInput.required = true;

    const passwordLabel = document.createElement('label');
    passwordLabel.htmlFor = 'password';
    passwordLabel.textContent = 'Lösenord:';

    const passwordInput = document.createElement('input');
    passwordInput.type = 'password';
    passwordInput.id = 'password';
    passwordInput.name = 'password';
    passwordInput.required = true;

    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Logga in';

    const messageParagraph = document.createElement('p');
    messageParagraph.className = 'message';
    messageParagraph.innerHTML = 'Har du inget konto? <a href="#">Registrera dig här</a>';

    // Lägg till elementen till deras respektive föräldrar
    loginForm.appendChild(usernameLabel);
    loginForm.appendChild(usernameInput);
    loginForm.appendChild(passwordLabel);
    loginForm.appendChild(passwordInput);
    loginForm.appendChild(submitButton);
    loginForm.appendChild(messageParagraph);

    loginContainer.appendChild(loginHeader);
    loginContainer.appendChild(loginForm);

    newDiv.appendChild(loginContainer)
  
    // Hitta befintlig container i HTML och lägg till den skapade div:en som ett barn
    let container = document.getElementsByTagName("body")[0];
    container.appendChild(newDiv);
    
    
    // Hämta alla div-element i kroppen förutom det med id "myDiv"
    const blurElements = document.body.querySelectorAll('div:not(#myDiv):not(#login-container):not(#login-header)');
    const allElements = document.body.querySelectorAll("*");

    // Applicera blur(10px) på varje div-element
    blurElements.forEach(element => {
      element.style.filter = 'blur(10px)';
    });

    // Ta bort setTimeout, innehållet ska finnas när man kryssar login/skapa elementet
    setTimeout(() => {
      for (let index = 0; index < allElements.length; index++) {
        allElements[index].style.filter = "none";
        
      }
      // Raderar login/skapa element
      newDiv.remove();
    }, 2000);
  }


  return (
    <header className="elementColor" style={
      {
        display:"flex", 
        alignItems:"center", 
        justifyContent: "space-between",
        flexDirection:"column",
    
      }
        } 
    > 
    <div style={{width:"100%", backgroundColor:"#1E222E", display:"flex", fontSize:"13px", justifyContent:"space-between", paddingRight:"10px", gap:"10px"}}>
      <div style={{display:"flex", gap:"10px"}}>
        <p>Datum: {datumStrang}</p>
        <p>Klockslag: {klockslagStrang}</p>
      </div>
      <div style={{display:"flex", gap:"10px"}}>

      <button onClick={()=>alert("Skapa konto fönster")} style={{
        border:"none", 
        background: 'transparent',
        cursor: 'pointer',
        outline: 'none',
        color:"#DBD5C6"
        }}>
          Skapa konto
        </button>
     <button onClick={()=>handleLogin()} style={{
        border:"none", 
        background: 'transparent',
        cursor: 'pointer',
        outline: 'none',
        color:"#DBD5C6"
        }}>
          Logga in
        </button>
      </div>
    </div>
      <div style={{width:"100%", justifyContent: "space-between", display:"flex", alignItems:"center"}}>
      <h2 style={{ margin: "auto"}} id="title">Protein/Krona</h2>

      <button
        style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            outline: 'none', // Ta bort fokusramsen vid klick
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            fontSize:"20px"
          }} 
          onClick={() => handleClick()} 
          title="Toggle light/dark mode"> 
          { screenMode ?
          <FontAwesomeIcon style={{color:"white"}} icon={faMoon} />
            : 
          <FontAwesomeIcon icon={faSun}/>
          }
        </button>

      </div>
    </header>
  );
});

export default Header;
