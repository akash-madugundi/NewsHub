import React from "react";

const PageNavigation = ({ page, totPages, setPage }) => {
  function nextPage() {
    setPage((prev) => prev + 1);
  }

  function prevPage() {
    setPage((prev) => Math.max(1, prev - 1));
  }

  return (
    <div className="mt-6 flex items-center justify-center space-x-4">
      <button
        className={`px-4 py-2 text-white font-medium rounded-lg transition 
          ${page <= 1 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 cursor-pointer"}
        `}
        disabled={page <= 1}
        onClick={prevPage}
      >
        &larr; Prev
      </button>

      <p className="text-lg font-semibold">
        {page} of {totPages}
      </p>

      <button
        className={`px-4 py-2 text-white font-medium rounded-lg transition 
          ${page >= totPages ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 cursor-pointer"}
        `}
        disabled={page >= totPages}
        onClick={nextPage}
      >
        Next &rarr;
      </button>
    </div>
  );
};

export default PageNavigation;