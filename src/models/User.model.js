const { Schema, model } = require("mongoose");

// Declare the Schema of the Mongo model
var userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = model("User", userSchema);
