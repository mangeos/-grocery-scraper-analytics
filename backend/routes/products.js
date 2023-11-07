const express = require("express");
const router = express.Router();
const db = require("../models"); // Importera dina Sequelize-modeller

// localhost:1337/api/v01/bike - hämtar alla bikes.
router.get("/", async (req, res) => {
  console.log("Time: ", Date.now());
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
    const result = await db.sequelize.query(query, {
      type: db.sequelize.QueryTypes.SELECT,
    });

    //console.log(result);
    res.send(result);
  } catch (error) {
    console.error("Något gick fel:", error);
  }
});

// localhost:1337/api/v01/bike - hämtar alla bikes.
router.get("/:param", async (req, res) => {
  console.log("Time: ", Date.now());
  try {
    const paramValue = req.params.param;
    console.log(paramValue);
    const query = `SELECT 
    CASE
        WHEN product LIKE '%agg-%' THEN 7 / jmfPrice
        ELSE (protein * 10) / jmfPrice
    END AS proteinPerKrona,
    id,
    product,
    energi2 AS kcal,
    href, jmfPrice, createdAt
FROM products
WHERE 
    product NOT LIKE '%buljong%'
    AND product NOT LIKE '%potatismos%'
    AND createdAt LIKE '${paramValue}%'
ORDER BY proteinPerKrona DESC;

`;
    // Kör frågan genom sequelize.query
    const result = await db.sequelize.query(query, {
      type: db.sequelize.QueryTypes.SELECT,
    });

    //console.log(result);
    res.send(result);
  } catch (error) {
    console.error("Något gick fel:", error);
  }
});

module.exports = router;
