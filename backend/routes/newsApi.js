import { Router } from "express";
import axios from "axios";
import cors from "cors";
import { pool } from "../config/dbConfig.js";
const router = Router();

const API_KEY = process.env.API_KEY;

function fetchNews(url, res) {
  axios
    .get(url)
    .then((response) => {
      if (response.data.totalResults > 0) {
        res.json({
          status: 200,
          success: true,
          message: "Successfully fetched the data",
          data: response.data,
        });
      } else {
        res.json({
          status: 200,
          success: true,
          message: "No more results to show",
        });
      }
    })
    .catch((error) => {
      res.json({
        status: 500,
        success: false,
        message: "Failed to fetch data from the API",
        error: error.message,
      });
    });
}

router.get("/", (req, res) => {
  res.send("Welcome to NewsHub!!!");
});

router.get("/all-news", (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 40;
  const page = parseInt(req.query.page) || 1;
  const url = `https://newsapi.org/v2/everything?q=page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  fetchNews(url, res);
});

router.get("/category-news", (req, res) => {
  const pageSize = parseInt(req.query.pageSize) || 40;
  const page = parseInt(req.query.page) || 1;
  const category = req.query.category || "business";
  const url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  fetchNews(url, res);
});

router.options("/country-news/:iso", cors());
router.get("/country-news/:iso", (req, res) => {
  let pageSize = parseInt(req.query.pageSize) || 40;
  let page = parseInt(req.query.page) || 1;
  let country = req.params.iso;
  let url = `https://newsapi.org/v2/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  fetchNews(url, res);
});

router.get("/editorial-news", async (req, res) => {
  try {
    const pageSize = parseInt(req.query.pageSize) || 40;
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * pageSize;

    const query = `
        SELECT * FROM news_articles
        ORDER BY publishedAt DESC
        LIMIT $1 OFFSET $2;
    `;
    
    const result = await pool.query(query, [pageSize, offset]);
    res.status(200).json({
        page,
        pageSize,
        total: result.rows.length,
        news: result.rows,
    });
  } catch (error) {
      console.error("Error fetching editorial news:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
