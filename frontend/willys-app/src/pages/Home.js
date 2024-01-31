import React, { useEffect, useState, useRef } from "react";
import apiRequests from "./../api/apiRequests"; // Importera din fil med API-förfrågningar
import Table from "./../components/Table";

const Home = () => {
  const [data, setData] = useState(null);
  const [modifiedData, setModifiedData] = useState(null);
const [numberOfDisplayedItems, setNumberOfDisplayedItems] = useState(20);
  // Senaste veckans datum - nu ändrar jag manuellt
  const [date, setDate] = useState(getFormattedDate(new Date()));
  const prevDateRef = useRef();
  // Senaste veckans datum - nu ändrar jag manuellt

  // Skapar en ref för att lagra det föregående date-värdet

  function getFormattedDate(date) {
    const myDate = new Date(date);
    const year = myDate.getFullYear();
    const month = String(myDate.getMonth() + 1).padStart(2, "0"); // Lägger till nollor om månaden är en siffra
    const day = String(myDate.getDate()).padStart(2, "0"); // Lägger till nollor om dagen är en siffra

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const apiData = await apiRequests.getData(date);
        console.log("Hämtad data:", apiData);
        setData(apiData);
      } catch (error) {
        console.error("Något gick fel:", error);
      }
    };
     // Kontrollera om det är första gången useEffect körs
    if (prevDateRef.current !== date) {
      fetchData();
      prevDateRef.current = date;
    }
   
  }, [date]);

  useEffect(() => {
    if (data !== null) {
      setModifiedData(data.slice(0, numberOfDisplayedItems));
      // console.log("data");
    }
  }, [data, numberOfDisplayedItems]);

  const handleChange = async (event) => {
    setDate(event.target.value);
  };

  const handlePush = async () => {
    try {
      const apiData = await apiRequests.startWebbScraping();
      console.log("Hämtad data:", apiData);
    } catch (error) {
      console.error("Något gick fel:", error);
    }
  };

  return (
    <>
      <div className="content">
        <div
          className="w3-container w3-center w3-animate-left"
          style={{
            display: "flex",
            /* flex: 1; */
            width: "30%",
            height: "119px",
            /* gap: 41px; */
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={handleChange}
          ></input>
        </div>
        {/* <button onClick={() => handlePush()}>Webbskrapa</button> */}
        <Table data={modifiedData} getFormattedDate={getFormattedDate} />
      </div>
      <div
        style={{ justifyContent: "center", display: "flex", margin: "20px" }}
      >
        <button className="load-more-button"
          onClick={() => {
           setNumberOfDisplayedItems((prevCount) => prevCount + 20);
          }}
        >
          Ladda fler...
        </button>
      </div>
    </>
  );
};

export default Home;
