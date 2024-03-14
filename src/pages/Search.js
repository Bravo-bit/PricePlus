import React, { useState } from "react";
import PropertyCatalog from "../components/Query/PropertyCatalog";
import SearchComponent from "../components/Query/SearchComponent";
import Card from "../components/Layout/Card";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  console.log(searchTerm)

  return (
    <>
      <SearchComponent onSearch={handleSearch} />
      <Card>
        <PropertyCatalog searchTerm={searchTerm} />
      </Card>
    </>
  );
};

export default Search;
