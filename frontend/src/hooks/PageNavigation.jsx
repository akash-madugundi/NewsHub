import React from "react";

const PageNavigation = ({ page, totPages, setPage }) => {
  function nextPage() {
    setPage((prev) => prev + 1);
  }

  function prevPage() {
    setPage((prev) => Math.max(1, prev - 1));
  }

  return (
    <div>
      <button disabled={page <= 1} onClick={prevPage}>
        &larr; Prev
      </button>
      <p>
        {page} of {totPages}
      </p>
      <button disabled={page >= totPages} onClick={nextPage}>
        Next &rarr;
      </button>
    </div>
  );
};

export default PageNavigation;
