const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// MongoDB en el puerto predeterminado 27017.
mongoose
  .connect("mongodb://localhost:27017/angular-auth", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then((db) => {
    console.log(
      "\nLa conexión de MongoDB se realizó correctamente.\nHost: " +
        db.connection.host
    );
  })
  .catch((err) => {
    console.log("Error en la conexión de la base de datos: " + err);
  });

require("../models/User.model");
