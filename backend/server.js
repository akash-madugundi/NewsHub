require("dotenv").config();

const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.urlencoded({extended: true}));

const API_KEY = process.env.API_KEY;

function fetchNews(url, res) {
    axios.get(url)
    .then(response => {
        if(response.data.totalResults > 0){
            res.json({
                status: 200,
                success: true,
                message: "Successfully fetched the data",
                data: response.data
            });
        } else {
            res.json({
                status: 200,
                success: true,
                message: "No more results to show"
            });
        }
    })
    .catch(error => {
        res.json({
            status: 500,
            success: false,
            message: "Failed to fetch data from the API",
            error: error.message
        });
    });
}

app.get("/", (req, res) => {
    res.send("Welcome to NewsHub!!!");
});

// all-news
app.get("/all-news", (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 40;
    let page = parseInt(req.query.page) || 1;
    let url = `https://newsapi.org/v2/everything?q=page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(url, res);
});

// category
app.options("/category-news", cors());
app.get("/category-news", (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 40;
    let page = parseInt(req.query.page) || 1;
    let category = req.query.category || "business";
    let url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(url, res);
});

// country
app.options("/country-news/:iso", cors());
app.get("/country-news/:iso", (req, res) => {
    let pageSize = parseInt(req.query.pageSize) || 40;
    let page = parseInt(req.query.page) || 1;
    let country = req.params.iso;
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}`;
    fetchNews(url, res);
});

// port
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});