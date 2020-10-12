// Importar Router de express
const { Router } = require("express");
const router = Router();

const userController = require("../controllers/user.controller");
const {
  verifyToken,
  isAdmin,
  checkDuplicateUserOrEmail,
  checkRolesExisted,
} = require("../middlewares");

module.exports = () => {
  router.get("/", userController.apiDescription);
  router.post(
    "/signup",
    [checkRolesExisted, checkDuplicateUserOrEmail],
    userController.signup
  );
  router.post("/signin", userController.signin);
  router.get("/tasks", userController.getTasks);
  router.get("/private-tasks", verifyToken, userController.getPrivateTasks);
  router.get("/profile", [verifyToken, isAdmin], userController.getProfile);
  return router;
};
