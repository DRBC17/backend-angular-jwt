// Importar Router de express
const { Router } = require("express");
const router = Router();

const userController = require("../controllers/user.controller");
module.exports = () => {
  router.get("/", userController.apiDescription);
  router.post("/signup", userController.signup);
  router.post("/signin", userController.signin);
  router.get("/tasks", userController.getTasks);
  router.get("/private-tasks", verifyToken, userController.getPrivateTasks);
  router.get("/profile", verifyToken, userController.getProfile);
  return router;
};

function verifyToken(req, res, next) {
  if (!req.headers.autorization) {
    return res.status(401).send("Unauthorized request");
  }

  const token = req.headers.autorization.split(" ")[1];

  if (token === "null") {
    return res.status(401).send("Unauthorized request");
  }

  const payload = jwt.verify(token, process.env.SECRET_KEY);

  //Guardar el id del usuario
  req.userId = payload._id;
  next();
}
