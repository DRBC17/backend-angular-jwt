const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const Role = require("../models/Role.model");

exports.verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      return res.status(403).json({ message: "No token provided" });

    //Bearer
    const token = req.headers.authorization.split(" ")[1];

    const payload = jwt.verify(token, process.env.SECRET_KEY);
    //Guardar el id del usuario
    req.userId = payload._id;

    const userFound = await User.findById(req.userId, { password: 0 });
    // console.log(userFound);
    if (!userFound) return res.status(400).json({ message: "User not found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized request" });
  }
};

exports.isAdmin = async (req, res, next) => {
  const userFound = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: userFound.roles } });

  for (let index = 0; index < roles.length; index++) {
    if (roles[index].name === "admin") {
      next();
      return;
    }
    
  }

  return res.status(401).json({ message: "Require Admin role" });
};

exports.isModerator = async (req, res, next) => {
    const userFound = await User.findById(req.userId);
    const roles = await Role.find({ _id: { $in: userFound.roles } });
  
    for (let index = 0; index < roles.length; index++) {
      if (roles[index].name === "moderator") {
        next();
        return;
      }
      
    }
  
    return res.status(401).json({ message: "Require Moderator role" });
};
