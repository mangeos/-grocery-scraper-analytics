import React from "react";
import { Line  } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = (d) => {
  
   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Pris Utveckling',
      },
    },
  };

  const labels = d && d.data && d.data.result ? d.data.result
      .filter(element => element.createdAt)
      .map(element => getFormattedDate(element.createdAt) ) : []

  function getFormattedDate(date) {
    const myDate = new Date(date);
    const year = myDate.getFullYear();
    const month = String(myDate.getMonth() + 1).padStart(2, "0"); // Lägger till nollor om månaden är en siffra
    const day = String(myDate.getDate()).padStart(2, "0"); // Lägger till nollor om dagen är en siffra

    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  }
  
  const datasets = {
    label: d?.data?.result?.filter(element => element.createdAt)?.map((dataset) => {
      return dataset.product;
    })[0],
    data: d?.data?.result?.filter(element => element.createdAt)?.map((dataset) => {
      return dataset.jmfPrice;
    }),
      borderColor:'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)'
    } 
  
  // console.log(datasets);
  const data = {
    labels,
    datasets: [datasets]
  };

  return (
    
    <Line data={data} options={options}/> 
    

  );
};

export default Chart;
