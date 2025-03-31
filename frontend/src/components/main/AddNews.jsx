import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularIndeterminate from "../layout/Loader";

const AddNews = () => {
  const [newsData, setNewsData] = useState({
    title: "",
    description: "",
    imgUrl: "",
    publishedAt: "",
    url: "",
    author: "",
    source: "",
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()

  const handleChange = (e) => {
    setNewsData({ ...newsData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch("http://localhost:8081/admin/add-news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add news");
      }

      setMessage("News added successfully!");
      setNewsData({
        title: "",
        description: "",
        imgUrl: "",
        publishedAt: "",
        url: "",
        author: "",
        source: "",
      });
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[75vh]">
        <CircularIndeterminate />
      </div>
    );
  }

  return (
    <div className="flex justify-center m-12 items-center h-[75vh]">
      {message || error ? (
        <div
          className={`text-center text-3xl ${
            message ? "text-green-500 font-bold" : "text-red-500font-bold"
          }`}
        >
          {message || error}
          <p className="text-gray-400 text-lg mt-2 font-mono italic">Redirecting in 5 seconds...</p>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-center">Add News</h2>
          {message && <p className="text-green-500">{message}</p>}
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="title"
              value={newsData.title}
              onChange={handleChange}
              placeholder="Title"
              className="w-full p-2 border rounded"
              required
            />
            <textarea
              name="description"
              value={newsData.description}
              onChange={handleChange}
              placeholder="Description"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="imgUrl"
              value={newsData.imgUrl}
              onChange={handleChange}
              placeholder="Image URL"
              className="w-full p-2 border rounded"
            />
            <input
              type="datetime-local"
              name="publishedAt"
              value={newsData.publishedAt}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="url"
              value={newsData.url}
              onChange={handleChange}
              placeholder="News URL"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              name="author"
              value={newsData.author}
              onChange={handleChange}
              placeholder="Author"
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              name="source"
              value={newsData.source}
              onChange={handleChange}
              placeholder="Source"
              className="w-full p-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-30 p-2 bg-blue-500 text-white rounded-lg cursor-pointer hover:text-gray-300 transition mx-auto block hover:shadow-lg hover:border border-gray-300"
              disabled={isLoading}
            >
              Add News
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddNews;
