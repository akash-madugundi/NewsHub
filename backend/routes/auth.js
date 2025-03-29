import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import user from "../models/user.js";

const router = express.Router();
// const SECRET_KEY = process.env.JWT_SECRET;

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user1 = await user.create({ email, password: hashedPassword });
    res.status(201).json({ success: true, message: "User registered", user1 });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error registering user", error });
  }
});

export default router;