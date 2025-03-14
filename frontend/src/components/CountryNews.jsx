import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemsDisplay from "./ItemsDisplay";
import PageNavigation from "../hooks/PageNavigation";
import CircularIndeterminate from "./Loader";

function CountryNews() {
  const [countryNews, setCountryNews] = useState([]);
  const { iso } = useParams();
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  let pageSize = 10;

  useEffect(() => {
    setPage(1);
  }, [iso]);

  useEffect(() => {
    // console.log("Fetching news for country: ", iso);
    setIsLoading(true);
    fetch(`http://localhost:8081/country-news/${iso}?page=${page}&pageSize=${pageSize}`, {
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
        setCountryNews(json.data.articles);
      })
      .catch((err) => console.error("Error fetching news: ", err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, iso]);

  return (
    <>
      {!isLoading ? (
        <>
          {countryNews.length > 0 ? (
            <ItemsDisplay NewsType={countryNews} />
          ) : (
            <p>No news articles found for this criteria.</p>
          )}
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

export default CountryNews;
