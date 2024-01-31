const express = require("express");
const router = express.Router();
const {Product, sequelize} = require("../models/product"); // Importera dina Sequelize-modeller
const scraper = require("../services/webScraping");

// localhost:1337/api/v01/bike - hämtar alla bikes.
router.get("/", async (req, res) => {
  try {
    const query = `
  SELECT ((protein*10)/jmfPrice) as proteinPerKrona, id, product, energi2 as kcal, href 
  FROM products 
  WHERE 
    product NOT LIKE "%buljong%" 
    AND product NOT LIKE "%agg-%" 
    AND product NOT LIKE "%potatismos%" 
  ORDER BY proteinPerKrona DESC;
`;
    // Kör frågan genom sequelize.query
    const result = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
    });

    res.status(200).send(result);
  } catch (error) {
    console.error("Något gick fel:", error);
    res.status(400).send("määä");
  }
});


// localhost:1337/api/v01/bike - hämtar alla bikes.
router.get("/start/1", async (req, res) => {
  try {
    await scraper.runAll();
    res.status(200).send(result);
  } catch (error) {
    console.error("Något gick fel:", error);
    res.status(400).send("määä");
  }
});

// localhost:1337/api/v01/bike - hämtar alla products.
router.get("/:param", async (req, res) => {
  try {
    const paramValue = req.params.param;
    
    console.log(paramValue);
    const query = `SELECT 
    CASE
      WHEN product LIKE '%agg-%' 
        THEN ROUND(7 / jmfPrice, 2)
        ELSE ROUND((protein * 10) / jmfPrice, 2)
    END AS proteinPerKrona,
    id,
    product,
    energi2 AS kcal,
    href, jmfPrice, createdAt
FROM products
WHERE 
    product NOT LIKE '%buljong%'
    AND product NOT LIKE '%potatismos%'
    AND createdAt LIKE :date
ORDER BY proteinPerKrona DESC;

`;
    // Kör frågan genom sequelize.query
    const result = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      replacements: {date: paramValue+"%"}
    });

    //console.log(result);
    res.send(result);
  } catch (error) {
    console.error("Något gick feil:", error);
    res.send("error");
  }
});

router.get("/product/:id", async (req, res) => {
  try {
    const paramValue = req.params.id;
    console.log(paramValue);

    const query = `
    SELECT * FROM products 
    WHERE product = :id 
    ORDER BY createdAt ASC;

`;
    // Kör frågan genom sequelize.query
    let result = await sequelize.query(query, {
      type: sequelize.QueryTypes.SELECT,
      replacements:{id: paramValue}
    });

    if (result.length < 1) {
      res.status(404).send({  error: 'Produkten kunde inte hittas.' } );        
    } else {
      let prisUtveckling = [];
      for (let index = 0; index < result.length; index++) {
        prisUtveckling.push(parseFloat(result[index].jmfPrice).toFixed(2));  
      }
      let utvecklingLength = prisUtveckling.length;
      result.push({"prisUtveckling1" : ((prisUtveckling[0] - prisUtveckling[1]) / prisUtveckling[1] * 100).toFixed(2)})
      result.push({"prisUtveckling2" : ((prisUtveckling[0] - prisUtveckling[utvecklingLength-1]) / prisUtveckling[utvecklingLength-1] * 100).toFixed(2)})
   
      res.status(200).send({ result: result, status: 200 });
    }
  } catch (error) {
    console.error("Något gick fel:", error);
    res.status(400).send(error);
  }
});

module.exports = router;
