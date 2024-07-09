const userModel = require("../models/User");

const getUserById = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (e) {
    res.json({ message: "Internal server Error" });
  }
};

module.exports = { getUserById };
