import React from "react";

const SearchResults = ({ filteredPokemon, onGetDetails }) => (
    <div className={'pokedex__search-results'}>
        {filteredPokemon.length > 0 ? (
            filteredPokemon.map(monster => (
                <div className={'pokedex__list-item'} key={monster.name}>
                    <div className={'pokedex__list-content'}>
                        <div>{monster.name}</div>
                        <button
                            onClick={onGetDetails(monster.name)}
                            aria-label={`Get details about ${monster.name}`}
                        >
                            Get Details
                        </button>
                    </div>
                </div>
            ))
        ) : (
            <div className={'pokedex__list-item'}>
                <div className={'pokedex__list-content'}>No Results Found</div>
            </div>
        )}
    </div>
);

export default SearchResults;