const userModel = require("../models/User");
const bcrypt = require("bcrypt");

const createAdmin = async () => {
  try {
    const existingAdmin = await userModel.findOne({ email: "admin@gmail.com" });
    if (existingAdmin) {
      console.log("admin already exists");
    } else {
      const hashedPassword = await bcrypt.hash("admin", 10);
      const newAdmin = new userModel({
        name: "admin",
        email: "admin@gmail.com",
        password: hashedPassword,
        role: "admin",
      });
      await newAdmin.save();
      console.log("admin Created Successfully");
      console.log(newAdmin);
    }
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

module.exports = { createAdmin };
