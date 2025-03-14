import React from "react";
import NewsItem from "./NewsItem";

const ItemsDisplay = ({ NewsType }) => {
  return (
    <div>
      {NewsType.length > 0 ? (
        NewsType.map((item, index) => {
          return (
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
          );
        })
      ) : (
        <p>Loading news...</p>
      )}
    </div>
  );
};

export default ItemsDisplay;
