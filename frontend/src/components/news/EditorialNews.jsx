import React, { useState, useEffect } from "react";
import ItemsDisplay from "./ItemsDisplay";
import PageNavigation from "../../hooks/PageNavigation";
import CircularIndeterminate from "../layout/Loader";

function EditorialNews() {
  const [editorialNews, setEditorialNews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  let pageSize = 9;

  useEffect(() => {
    setIsLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/news/editorial-news?page=${page}&pageSize=${pageSize}`, {
      method: "GET",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((json) => {
        if (!json) {
          throw new Error(json.message || "API response error");
        }
        setTotalResults(json.total);
        setEditorialNews(json.news);
      })
      .catch((err) => console.error("Error fetching news: ", err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [page]);

  return (
    <>
      {!isLoading ? (
        <div className="container mx-auto px-6 py-6">
          <ItemsDisplay NewsType={editorialNews} isEditorial={true} />
          <PageNavigation
            page={page}
            totPages={Math.ceil(totalResults / 5)}
            setPage={setPage}
          />
          {/* error at 5 */}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[75vh]">
          <CircularIndeterminate />
        </div>
      )}
    </>
  );
}

export default EditorialNews;
