const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.json({ Message: "Unauthorized Missing Token" });
  }
  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res.json({ Message: "Invalid Token Formet" });
  }

  jwt.verify(token, "password", (err, user) => {
    if (err) {
      return res.json({ Message: "Invalid Token" });
    }

    req.user = user;
    next();
  });
};

module.exports = { authenticateToken };
