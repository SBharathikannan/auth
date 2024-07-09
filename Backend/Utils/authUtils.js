const jwt = require("jsonwebtoken");
const generateToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, "password", { expiresIn: "1h" });
};

const generateRefreshToken = (user) => {
  const payload = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return jwt.sign(payload, "password", { expiresIn: "7h" });
};

const verifyToken = (token) => {
  return jwt.verify(token, "password");
};

module.exports = { generateRefreshToken, generateToken, verifyToken };
