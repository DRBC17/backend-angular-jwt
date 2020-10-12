const User = require("../models/User.model");
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
  const { email, password } = req.body;
  try {
    const newUser = new User({ email, password });
    await newUser.save();

    const token = jwt.sign({ _id: newUser.id }, process.env.SECRET_KEY, {
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
    const user = await User.findOne({ email });
    if (!user) return res.status(401).send("The email doesn't exists");

    if (bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ _id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });

      res.status(200).json({ token });
    } else {
      return res.status(401).send("Wrong Password");
    }
  } catch (error) {
    console.log("golarr");
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
