import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ItemsDisplay from "./ItemsDisplay";
import PageNavigation from "../../hooks/PageNavigation";
import CircularIndeterminate from "../layout/Loader";

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
    fetch(`${import.meta.env.VITE_BACKEND_URL}/news/country-news/${iso}?page=${page}&pageSize=${pageSize}`, {
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
        setTotalResults(json?.data?.totalResults || 0);
        setCountryNews(json?.data?.articles || []);
      })
      .catch((err) => console.error("Error fetching news: ", err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [page, iso]);

  return (
    <>
      {!isLoading ? (
        <div className="container mx-auto px-6 py-6">
          {countryNews.length > 0 ? (
            <>
              <ItemsDisplay NewsType={countryNews} />
              <PageNavigation
                page={page}
                totPages={Math.ceil(totalResults / pageSize)}
                setPage={setPage}
              />
            </>
          ) : (
            <div className="flex justify-center items-center h-64">
              <p className="text-xl text-gray-600 font-semibold bg-gray-100 px-6 py-4 rounded-lg shadow-md">
                No News articles available for this selection.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[75vh]">
          <CircularIndeterminate />
        </div>
      )}
    </>
  );
}

export default CountryNews;
