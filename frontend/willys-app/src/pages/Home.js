import React, { useEffect, useState, useRef } from "react";
import apiRequests from "./../api/apiRequests"; // Importera din fil med API-förfrågningar
import Table from "./../components/Table";
const Home = () => {
  const [data, setData] = useState(null);
  const [modifiedData, setModifiedData] = useState(null);
  const [a, setA] = useState(20);
  // Senaste veckans datum - nu ändrar jag manuellt
  const [date, setDate] = useState(getFormattedDate(new Date()));
  const prevDateRef = useRef();
  // Senaste veckans datum - nu ändrar jag manuellt
  prevDateRef.current = getFormattedDate(new Date());
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

    fetchData();
  }, [date]);

  useEffect(() => {
    if (data !== null) {
      setModifiedData(data.slice(0, a));
      console.log("data");
    }
  }, [data, a]);

  const handleChange = async (event) => {
    setDate(event.target.value);
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
            /* justify-content: center; */
            alignItems: "center",
          }}
        >
          <label htmlFor="date">Datum:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={handleChange}
          ></input>
        </div>
        <Table data={modifiedData} getFormattedDate={getFormattedDate} />
      </div>
      <div
        style={{ justifyContent: "center", display: "flex", margin: "20px" }}
      >
        <button
          onClick={() => {
            setA((prevA) => prevA + 20);
          }}
        >
          Ladda fler...
        </button>
      </div>
    </>
  );
};

export default Home;
