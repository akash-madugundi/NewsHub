import express from "express";
import bcrypt from "bcryptjs";
import user from "../models/user.js";
import { generateToken } from "../config/jwtConfig.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH;

router.post("/sign-up", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await user.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists, please log in" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await user.create({ email, password: hashedPassword });
    res.status(201).json({ 
      success: true, 
      message: "Registration successful! Redirecting to login...", 
      newUser  
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: "Error registering user", 
      error 
    });
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await user.findOne({ where: { email } });
    
    if (!existingUser) {
      return res.status(400).json({ success: false, message: "User not found, please sign up" });
    }
    
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }
    
    const token = generateToken({ id: existingUser.id, email: existingUser.email });
    
    res.status(200).json({ 
      success: true, 
      message: "Login successful! Redirecting...", 
      token,
      user: { id: existingUser.id, email: existingUser.email }
    });
  } catch (error) { 
    res.status(500).json({ 
      success: false, 
      message: "Error signing in", 
      error 
    });
  }
});

router.post("/admin", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (email === ADMIN_EMAIL) {
      const isAdminPasswordValid = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
      if (!isAdminPasswordValid) {
        return res.status(401).json({ success: false, message: "Invalid credentials" });
      }
      
      const token = generateToken({ email, role: "admin" });

      return res.status(200).json({
        success: true,
        message: "Admin login successful!",
        token,
        user: { email, role: "admin" },
      });
    }
  } catch (error) { 
    res.status(500).json({ 
      success: false, 
      message: "Error signing in", 
      error 
    });
  }
});

export default router;