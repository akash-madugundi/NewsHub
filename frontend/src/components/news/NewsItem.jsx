import React from "react";

function NewsItem({ title, description, imgUrl, publishedAt, url, author, source }) {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:border-blue-500 hover:border-2">
      <a href={url} target="_blank" rel="noopener noreferrer">
        <img
          src={imgUrl || "https://via.placeholder.com/300"}
          alt="News"
          className="w-full h-60 object-cover"
        />
      </a>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          <a href={url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
            {title}
          </a>
        </h3>
        <p className="text-gray-600 text-sm">
          {description ? description.substring(0, 120) + "..." : "No description available"}
        </p>
        <p className="text-gray-500 text-xs mt-2">Source: <span className="font-semibold">{source}</span></p>
        <p className="text-gray-500 text-xs">Author: {author || "Unknown"}</p>
        <p className="text-gray-500 text-xs">Published: {new Date(publishedAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default NewsItem;