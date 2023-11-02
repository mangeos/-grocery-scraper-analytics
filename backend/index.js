const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3003;

app.use(cors());
app.use(bodyParser.json({ type: "application/*+json" }));
//app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Startar webb skrapningen, tanken är att den ska köras en gång varje vecka
require("./services/webScraping");

// Routes
const products = require("./routes/products");

// Adding routes
app.use("/", products);

//require("./services/webScraping");
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
