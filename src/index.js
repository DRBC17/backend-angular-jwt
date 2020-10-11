const express = require("express");

const usersRouter = require("./routes/user.router");
const app = express();

require("./config/database");

app.use("/api", usersRouter());

app.listen(3000, () => {
  console.log(`Server started on port ${3000}`);
});
