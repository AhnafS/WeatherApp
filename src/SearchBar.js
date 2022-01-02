import { React, useState } from "react";

const SearchBar = ({ setCity }) => {
  const [searchInput, setSearchInput] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    setCity(searchInput);
  };

  return (
    <nav>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="City Name"
          className="text-center border-2 border-black rounded-md"
        />
      </form>
    </nav>
  );
};

export default SearchBar;
