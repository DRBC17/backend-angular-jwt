const User = require("../models/User.model");
const pkg = require("../../package.json");
exports.apiDescription = (req, res, next) => {
  try {
    const datos = {
      name: pkg.name,
      description: pkg.description,
      author: pkg.author,
      version: pkg.version,
    };
    res.status(200).json(datos);
  } catch (error) {
    res.json(error);
  }
};
