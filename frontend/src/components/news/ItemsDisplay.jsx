import React from "react";
import NewsItem from "./NewsItem";

const ItemsDisplay = ({ NewsType }) => {
  return (
    <div className="container mx-auto px-6 py-6">
      {NewsType.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NewsType.map((item, index) => (
            <NewsItem
              key={index}
              title={item.title}
              description={item.description}
              imgUrl={item.urlToImage}
              publishedAt={item.publishedAt}
              url={item.url}
              author={item.author}
              source={item.source.name}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg">Loading news...</p>
      )}
    </div>
  );
};

export default ItemsDisplay;
