import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import crypto from "crypto";

dotenv.config();

// const generateSecret = () => crypto.randomBytes(32).toString("hex");
// const jwtSecret = process.env.JWT_SECRET || generateSecret();
const jwtSecret = process.env.JWT_SECRET;

const jwtConfig = {
  secret: jwtSecret,
  expiresIn: process.env.JWT_EXPIRES_IN || "1h",
};

const generateToken = (payload) => {
  const token = jwt.sign(payload, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
  return token;
};

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, jwtConfig.secret, (err, decoded) => {
      if (err) reject(err);
      const payload = decoded;
      resolve(payload);
    });
  });
};

export { jwtConfig, generateToken, verifyToken };