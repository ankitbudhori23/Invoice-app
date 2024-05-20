require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./routes/auth-routes");
const invoice = require("./routes/invoice-routes");
const dbconnect = require("./utils/db");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 5000;
dbconnect();
app.use(bodyParser.json());
app.use(cors({ origin: "*" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use("/api/auth", router);
app.use("/api/invoice", invoice);

app.listen(port, (req, res) => {
  console.log(`port is running on ${port}`);
});
