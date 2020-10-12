const { Schema, model } = require("mongoose");

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
    roles: [
      {
        ref: "Role",
        type: Schema.Types.ObjectId,
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(saltRounds);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compareSync(password, receivedPassword);
};

//Export the model
module.exports = model("User", userSchema);
