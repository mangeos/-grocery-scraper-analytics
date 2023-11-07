const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3003;

app.use(cors());
app.use(bodyParser.json({ type: "application/*+json" }));
//app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

const cron = require("node-cron");

// Skapa en schemalagd uppgift som körs varje måndag klockan 09:00
cron.schedule("01 08 * * 1", () => {
  console.log("Denna kod körs varje måndag kl. 08:01");
  // Lägg till din kod eller program som ska köras varje måndag kl. 09:00 här
  // Startar webb skrapningen, tanken är att den ska köras en gång varje vecka
  require("./services/webScraping");
});
//require("./services/webScraping");

// Routes
const products = require("./routes/products");

// Adding routes
app.use("/", products);

//require("./services/webScraping");
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
