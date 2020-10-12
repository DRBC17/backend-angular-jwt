const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorized request");
  }
  //Bearer
  const token = req.headers.authorization.split(" ")[1];

  if (token === "null") {
    return res.status(401).send("Unauthorized request");
  }

  const payload = jwt.verify(token, process.env.SECRET_KEY);

  //Guardar el id del usuario
  req.userId = payload._id;
  next();
};
