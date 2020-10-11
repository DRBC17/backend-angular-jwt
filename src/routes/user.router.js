// Importar Router de express
const { Router } = require("express");
const router = Router();

const userController = require("../controllers/user.controller");
module.exports = () => {
  router.get("/", userController.apiDescription);
  return router;
};
