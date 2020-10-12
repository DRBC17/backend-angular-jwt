const { Schema, model } = require("mongoose");

// Declare the Schema of the Mongo model
var roleSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
  },
  {
    versionKey: false,
  }
);


//Export the model
module.exports = model("Role", roleSchema);
