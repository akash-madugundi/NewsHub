import React, { useState } from "react";
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
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    setNewsData({ ...newsData, [e.target.name]: e.target.value });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "NewsHub");
      data.append("cloud_name", "dkigaei9n");

      try {
        const res = await fetch("https://api.cloudinary.com/v1_1/dkigaei9n/image/upload", {
          method: "POST",
          body: data,
        });
  
        const imgData = await res.json();
        if (imgData.url) {
          handleChange({ target: { name: "imgUrl", value: imgData.url } });
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/admin/add-news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsData),
      });

      const data = await response.json();

      if (!response.ok) {
        setTimeout(() => {
          setMessage(null);
        }, 5000);
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
      setImageFile(null);
      setPreview(null);
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
    <div className="flex justify-center m-38 items-center h-[75vh]">
      {message || error ? (
        <div
          className={`text-center text-3xl ${
            message ? "text-green-500 font-bold" : "text-red-500font-bold"
          }`}
        >
          {message || error}
          <p className="text-gray-400 text-lg mt-2 font-mono italic">
            Redirecting in 5 seconds...
          </p>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-3xl font-bold mb-4 text-center">Add News</h2>

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
              placeholder="Image URL (or upload below)"
              className="w-full p-2 border rounded"
            />

            <label className="w-full flex items-center justify-center p-4 bg-gray-200 text-gray-700 rounded-lg cursor-pointer hover:bg-gray-300 transition">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
              <span className="font-semibold">📁 Choose Image</span>
            </label>

            {preview || newsData.imgUrl ? (
              <div className="relative mt-2">
                <img
                  src={preview || newsData.imgUrl}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded"
                />

                <a
                  href={preview || newsData.imgUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition"
                >
                  <span className="text-blue-500 font-bold">🔍</span>{" "}
                </a>
              </div>
            ) : null}

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
