import React, { useEffect, useState } from "react";
import Chart from "../components/Chart"
import api from "../api/apiRequests"
import { useLocation  } from "react-router-dom";

const Product = () => {
  const [data, setData] = useState([]);
  const location = useLocation();

  const { pathname } = location;
  
  useEffect( () => {
   const request = async () =>{
     try {
       let res = await api.getProductData(pathname.split("/")[2]);
       setData(res)
     } catch (error) {
       console.log(error);
     }
   }
    request()
  },[pathname])
  
  return (
    <div style={{display:"flex", gap:"30px", flex:"1", justifyContent:"center", alignItems:"center", flexDirection:"column", marginTop:"30px"}}>
      <div style={{display:"flex", borderRadius:"8px", background:"white", height:"400px", width:"830px"}}>
        <Chart data={data}/>
      </div>
      <div style={{display:"flex", gap:"30px", flex:"1", justifyContent:"center", alignItems:"center", marginBottom:"30px"}}>
        <div style={{display:"flex", borderRadius:"8px", background:"white", height:"300px", width:"400px"}}>
          <Chart/>
        </div>
        <div style={{display:"flex", background:"white", borderRadius:"8px", height:"300px", width:"400px"}}>
          <Chart/>
        </div>
      </div>
     
    </div>
  );
}

export default Product;
