const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();

const { createRoles } = require("./libs/initialSetup");

const usersRouter = require("./routes/user.router");
const app = express();

createRoles();

require("./config/database");
// Middlewares
const corsOptions = {
  // origin: "http://localhost:3000",
};
app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", usersRouter());

app.listen(process.env.PORT, () => {
  console.log(`Server started on port ${process.env.PORT}`);
});
