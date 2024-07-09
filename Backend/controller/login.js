const bcrypt = require("bcrypt");
const userModel = require("../models/User");
const {
  generateToken,
  generateRefreshToken,
  verifyToken,
} = require("../Utils/authUtils");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!email) {
      //throw new Error("User not found");
      res.send("User not found");
    }
    const ispasswordValid = bcrypt.compare(password, user.password);

    if (!ispasswordValid) {
      res.send("Incorrect Password");
    }

    const token = generateToken(user);
    res.send({ user, token });
  } catch (e) {
    res.send("Invalid Credentials");
  }
};

const refreshToken = async (req, res) => {
  try {
    const { oldToken } = req.body;
    const decodedToken = verifyToken(oldToken);
    const existingUser = await userModel.findById(decodedToken.id);

    const newToken = generateRefreshToken(existingUser);
    console.log(newToken);
    res.json({ newToken: newToken });
    if (!existingUser) {
      throw new Error("User not Found");
    }
  } catch (e) {
    res.send("Invalid Token");
  }
};

module.exports = { login, refreshToken };
