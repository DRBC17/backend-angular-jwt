const User = require("../models/User.model");

const rolesArray = ["user", "admin", "moderator"];

exports.checkRolesExisted = (req, res, next) => {
  const { roles } = req.body;
  if (roles) {
    for (let index = 0; index < roles.length; index++) {
        console.log(rolesArray);
      if (!rolesArray.includes(roles[index])) {
        return res
          .status(401)
          .json({ message: `Role ${roles[index]} does not exist` });
      }
    }
  }
  next();
};

exports.checkDuplicateUserOrEmail = async (req, res, next) => {
  const { email } = req.body;
  const userFound = await User.findOne({ email });

  if (userFound)
    return res
      .status(400)
      .json({ message: `the email ${email} already exist` });

  next();
};
