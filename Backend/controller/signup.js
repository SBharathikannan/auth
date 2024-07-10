const express = require("express");
const bcrypt = require("bcrypt");
const userModel = require("../models/User");
const signup = async (req, res) => {
  try {
    console.log("Received signup request:", req.body); // Log request body

    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };
    const user = await userModel.create(newUser);
    console.log("User created:", user); // Log user data
    return res.send(user);
  } catch (e) {
    console.error("Signup error:", e.message);
    return res.status(500).send(e.message);
  }
};
module.exports = { signup };
