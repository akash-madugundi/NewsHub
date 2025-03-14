import React from "react";

function NewsItem(props) {
  return (
    <div>
      <a href={props.url} target="_blank" rel="noopener noreferrer">
        {props.title}
      </a>
      <img
        src={props.imgUrl}
        alt="img"
        style={{ width: "80px", height: "auto" }}
      />
      <p>
        {props.description
          ? props.description.substring(0, 200)
          : "No description available"}
      </p>
      <span>Source:</span>
      <a href={props.url} target="_blank">
        {props.source.substring(0, 70)}
      </a>
      <p className="origin-item">
        <span>Author:</span>
        {props.author}
      </p>
      <p className="origin-item">
        <span>Published At:</span>({props.publishedAt}
        )
      </p>
    </div>
  );
}

export default NewsItem;
