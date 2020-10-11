const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();
const usersRouter = require("./routes/user.router");
const app = express();

require("./config/database");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", usersRouter());

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
