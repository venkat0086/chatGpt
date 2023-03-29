require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User_model");

const newToken = (user) => {
  return jwt.sign({ user }, process.env.JWT_SECRET_KEY);
};

const register = async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email }).lean().exec();
    let checkUser = await User.findOne({ username: req.body.username })
      .lean()
      .exec();
    if (user) return res.send({ message: "Mail Id already registered" });
    if (checkUser) return res.send({ message: "Username already taken" });

    user = await User.create(req.body);

    const token = newToken(user);

    const mailid = user.email;
    return res.send({ mailid, token });
  } catch (err) {
    return res.status(500).send(err.message);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return res.send({ message: "User is not registered" });

    const match = user.checkPassword(req.body.password);

    if (!match)
      return res.send({ message: "Your username or password is incorrect" });

    const token = newToken(user);

    const mailid = user.username;

    res.send({ mailid, token });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

module.exports = { register, login, newToken };
