const { Schema, model } = require("mongoose");

const uniqueValidator = require("mongoose-unique-validator");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;

const validateEmail = function (email) {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

// Declare the Schema of the Mongo model
var userSchema = new Schema(
  {
    email: {
      type: String,
      trim: true,
      required: [true, "El correo electrónico es obligatorio"],
      lowercase: true,
      unique: true,
      validate: [validateEmail, "El email no es valido"],
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/],
    },
    password: {
      type: String,
      required: [true, "La contraseña es obligatoria"],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator, {
  message: "El {PATH} ya existe con otro usuario",
});

userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
  }
  next();
});

//Export the model
module.exports = model("User", userSchema);
