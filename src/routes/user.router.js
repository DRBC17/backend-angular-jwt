// Importar Router de express
const { Router } = require("express");
const router = Router();

const userController = require("../controllers/user.controller");
const tokenController = require("../controllers/auth.controller");

module.exports = () => {
  router.get("/", userController.apiDescription);
  router.post("/signup", userController.signup);
  router.post("/signin", userController.signin);
  router.get("/tasks", userController.getTasks);
  router.get(
    "/private-tasks",
    tokenController.verifyToken,
    userController.getPrivateTasks
  );
  router.get(
    "/profile",
    tokenController.verifyToken,
    userController.getProfile
  );
  return router;
};
