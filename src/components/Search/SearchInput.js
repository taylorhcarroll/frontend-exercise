import React from "react";

const SearchInput = ({ searchValue, onSearchValueChange }) => (
    <div className={'pokedex__search-input'}>
        <input
            value={searchValue}
            onChange={onSearchValueChange}
            placeholder="Search Pokemon"
            aria-label="Search Pokemon"
        />
    </div>
);

export default SearchInput;