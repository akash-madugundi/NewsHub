import React, { useState, useEffect } from "react";
import ItemsDisplay from "./ItemsDisplay";
import PageNavigation from "../hooks/PageNavigation";
import CircularIndeterminate from "./Loader";

function AllNews() {
  const [allNews, setAllNews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  let pageSize = 10;

  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:8081/all-news?page=${page}&pageSize=${pageSize}`, {
      method: "GET",
    })
      .then((response) => {
        // server response, req to api successful
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        // api response, api res is there or not
        if (!json.success) {
          throw new Error(json.message || "API response error");
        }
        setTotalResults(json.data.totalResults);
        setAllNews(json.data.articles);
      })
      .catch((err) => console.error("Error fetching news: ", err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  return (
    <>
      {!isLoading ? (
        <>
          <ItemsDisplay NewsType={allNews} />
          <PageNavigation
            page={page}
            totPages={Math.ceil(totalResults / pageSize)}
            setPage={setPage}
          />
        </>
      ) : (
        <CircularIndeterminate />
      )}
    </>
  );
}

export default AllNews;
