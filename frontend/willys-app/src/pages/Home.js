import React, { useEffect, useState } from "react";
import apiRequests from "./../api/apiRequests"; // Importera din fil med API-förfrågningar
import Table from "./../components/Table";
const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiData = await apiRequests.getSomeData(); // Anropa API-förfrågan
        console.log("Hämtad data:", apiData);
        setData(apiData);
        // Gör något med den hämtade datan, t.ex. uppdatera state, etc.
      } catch (error) {
        console.error("Något gick fel:", error);
      }
    };

    fetchData();
  }, []); // Körs vid montering (när komponenten renderas för första gången)

  return (
    <>
      <div className="content">
        <Table data={data} />
      </div>
    </>
  );
};

export default Home;
