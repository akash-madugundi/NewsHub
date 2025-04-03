import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemsDisplay from "./ItemsDisplay";
import PageNavigation from "../../hooks/PageNavigation";
import CircularIndeterminate from "../layout/Loader";

function CategoryNews() {
  const [categoryNews, setCategoryNews] = useState([]);
  const { category } = useParams();
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  let pageSize = 10;

  useEffect(() => {
    setPage(1);
  }, [category]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/news/category-news?category=${category}&page=${page}&pageSize=${pageSize}`, {
        method: "GET",
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        if (!json.success) {
          throw new Error(json.message || "API response error");
        }
        setTotalResults(json.data.totalResults);
        setCategoryNews(json.data.articles);
      })
      .catch((err) => console.error("Error fetching news: ", err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, category]);

  return (
    <>
      {!isLoading ? (
        <div className="container mx-auto px-6 py-6">
          <ItemsDisplay NewsType={categoryNews} />
          <PageNavigation
            page={page}
            totPages={Math.ceil(totalResults / pageSize)}
            setPage={setPage}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center h-[75vh]">
          <CircularIndeterminate />
        </div>
      )}
    </>
  );
}

export default CategoryNews;
