import { Router } from "express";
import dotenv from "dotenv";
import { pool } from "../config/dbConfig.js";

dotenv.config();
const router = Router();

router.post("/add-news", async (req, res) => {
    try {
        const { title, description, imgUrl, publishedAt, url, author, source } = req.body;
        
        if (!title || !url) {
            return res.status(400).json({ error: "Title and URL are required" });
        }
        
        const query = `
            INSERT INTO news_articles (title, description, imgurl, publishedat, url, author, source)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING *;
        `;

        const values = [title, description, imgUrl, publishedAt, url, author, source];
        
        const result = await pool.query(query, values);
        
        res.status(201).json({ message: "News added successfully", news: result.rows[0] });
    } catch (error) {
        console.error("Error adding news:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

export default router;
