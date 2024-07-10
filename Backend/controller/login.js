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
    if (!user) {
      return res.status(404).send("User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).send("Incorrect Password");
    }

    const token = generateToken(user);
    return res.status(200).json({ user, token });
  } catch (e) {
    console.error("Error during login:", e);
    return res.status(500).send("Invalid Credentials");
  }
};

const refreshToken = async (req, res) => {
  try {
    const { oldToken } = req.body;
    const decodedToken = verifyToken(oldToken);
    const existingUser = await userModel.findById(decodedToken.id);

    if (!existingUser) {
      return res.status(404).send("User not found");
    }

    const newToken = generateRefreshToken(existingUser);
    return res.status(200).json({ newToken });
  } catch (e) {
    console.error("Error during token refresh:", e);
    return res.status(401).send("Invalid Token");
  }
};

module.exports = { login, refreshToken };
