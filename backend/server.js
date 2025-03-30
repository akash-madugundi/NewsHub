import express, { json, urlencoded } from "express";
import cors from "cors";
import { connectDB } from "./config/dbConfig.js";
import authRoutes from "./routes/auth.js";
import newsRoutes from "./routes/newsApi.js";

// Connect to PostgreSQL
connectDB();

// Middleware
const app = express();
app.use(cors());
app.use(json({ limit: "100mb" }));
app.use(urlencoded({ extended: true }));

// Routes
app.use("/auth", authRoutes);
app.use("/news", newsRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));