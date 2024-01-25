import React, {useEffect, useState} from "react";
import apiRequests from "../api/apiRequests";
import Table2 from "../components/Table2"
// import api from "../api/apiRequests"

const Products = () => {
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
    let res = name !== "" ? data.filter((item) => item.product.toLowerCase().includes(name.toLowerCase())) : [];
    console.log(res);
    setResult(res)
  }


  useEffect(() => {
    const request = async ()  => {
      try {
        let apiData = await apiRequests.getData(`2024-01-22`)
        setData(apiData);
        console.log("Hämtad data:", apiData);
      } catch (error) {
        console.log(error);
      }
    }
    request();
  }, [])

  return (
    <div style={{display:"flex", gap:"30px", flex:"1", justifyContent:"center", alignItems:"center", flexDirection:"column", marginTop:"30px"}}>
      <form onSubmit={handleSubmit}>
      <span>Enter your name:</span>
        <input 
          type="text" 
          value={name}
          onChange={(e) => {
           setName(e.target.value)
          }
        }
        />
      <input type="submit" />
    </form>
    <Table2 data={result}/>
    </div>
  );
}

export default Products;
