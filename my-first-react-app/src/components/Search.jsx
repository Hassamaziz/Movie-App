import React from "react";

const Search = ({ searchTerm, setSearchTerm }) => {
  return (
    <div>
      <div className="search">
        <div>
          <img src="search.svg" alt="" srcset="" />
          <input
            type="text"
            placeholder="Search for a movie..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
