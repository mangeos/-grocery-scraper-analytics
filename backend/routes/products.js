const express = require("express");
const router = express.Router();
const db = require("../models"); // Importera dina Sequelize-modeller

// localhost:1337/api/v01/bike - hämtar alla bikes.
router.get("/", async (req, res) => {
  console.log("Time: ", Date.now());
  try {
    const result = await db.Product.findAll({
      attributes: [
        [db.sequelize.literal("((protein*10)/jmfPrice)"), "proteinPerKrona"],
        "product",
        "href",
        "createdAt",
      ],
      order: [[db.sequelize.literal("proteinPerKrona"), "DESC"]],
    });

    console.log(result);
    res.send(result);
  } catch (error) {
    console.error("Något gick fel:", error);
  }
});

module.exports = router;
