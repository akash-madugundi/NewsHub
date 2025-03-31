import React from "react";
import NewsItem from "./NewsItem";

const ItemsDisplay = ({ NewsType, isEditorial = false }) => {
  return (
    <div className="container mx-auto px-6 py-6">
      {NewsType.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {NewsType.map((item, index) => (
            <NewsItem
              key={index}
              title={item.title}
              description={item.description}
              imgUrl={!isEditorial ? item.urlToImage : item.imgurl}
              publishedAt={!isEditorial ? item.publishedAt : item.publishedat}
              url={item.url}
              author={item.author}
              source={!isEditorial ? item.source.name : item.source}
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
