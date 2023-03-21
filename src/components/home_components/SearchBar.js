import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React, { useState } from "react";

const searchBar = () => {
  const [searchInput, setSearchInput] = useState("");

  const countries = [];

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  if (searchInput.length > 0) {
    countries.filter((country) => {
      return country.name.match(searchInput);
    });
  }

  return (
    <>
      <InputGroup size="lg" width="70%">
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Seach here..."
          boxShadow="md"
        />
        <InputRightElement>
          <i class="fa fa-search" aria-hidden="true"></i>
        </InputRightElement>
      </InputGroup>
    </>
  );
};

export default searchBar;
