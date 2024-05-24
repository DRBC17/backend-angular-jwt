const User = require("../models/User.model");
const Role = require("../models/Role.model");
const pkg = require("../../package.json");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

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

exports.signup = async (req, res, next) => {
  const { email, password, roles } = req.body;
  try {
    const newUser = new User({
      email,
      password: await User.encryptPassword(password),
    });

    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role.id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role.id];
    }

    const saveUser = await newUser.save();
    const token = jwt.sign({ _id: saveUser.id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res.status(200).json({ token });
  } catch (error) {
    res.json(error);
  }
};

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const userFound = await User.findOne({ email }).populate("roles");
    // console.log(userFound);

    if (!userFound) return res.status(400).json({ message: "User not found" });

    const matchPassword = await User.comparePassword(
      password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({ token: null, message: "Invalid password" });

    const token = jwt.sign({ _id: userFound.id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.json(error);
  }
};

exports.getTasks = (req, res, next) => {
  try {
    const tasks = [
      {
        _id: 1,
        name: "Task",
        description: "Lorem ipsum",
        date: "2020-10-11T21:12:01.391+00:00",
      },
      {
        _id: 2,
        name: "Task 2",
        description: "Lorem ipsum",
        date: "2020-10-11T21:12:01.391+00:00",
      },
      {
        _id: 3,
        name: "Task 3",
        description: "Lorem ipsum",
        date: "2020-10-11T21:12:01.391+00:00",
      },
    ];
    res.json(tasks);
  } catch (error) {
    res.json(error);
  }
};

exports.getPrivateTasks = (req, res, next) => {
  try {
    const tasks = [
      {
        _id: 1,
        name: "Task",
        description: "Lorem ipsum",
        date: "2020-10-11T21:12:01.391+00:00",
      },
      {
        _id: 2,
        name: "Task 2",
        description: "Lorem ipsum",
        date: "2020-10-11T21:12:01.391+00:00",
      },
      {
        _id: 3,
        name: "Task 3",
        description: "Lorem ipsum",
        date: "2020-10-11T21:12:01.391+00:00",
      },
    ];
    res.json(tasks);
  } catch (error) {
    res.json(error);
  }
};

exports.getProfile = (req, res, next) => {
  res.send(req.userId);
};
