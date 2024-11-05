import React from "react";

const PokemonDetails = ({ pokemonDetails, detailsRef }) => (
    <div
        className={'pokedex__details'}
        ref={detailsRef}
        role="region"
        aria-live="polite"
        aria-labelledby="pokedex-details-title"
    >
        <div className="pokedex__details-row">
            <h2 className="pokedex__details-title" id="pokedex__details-title">
                {pokemonDetails.name}
            </h2>
        </div>
        {pokemonDetails.sprites && (
            <div className="pokedex__details-row">
                <img
                    id="pokedex__details-sprite"
                    alt={`${pokemonDetails.name} front sprite`}
                    src={pokemonDetails.sprites.front_default}
                />
            </div>
        )}
        <div className="pokedex__details-row">
            <div className="pokedex__details-column">
                <h3>Types:</h3>
                <ul>
                    {pokemonDetails.types?.map((type, index) => (
                        <li key={index}>{type.type.name}</li>
                    ))}
                </ul>
            </div>
            <div className="pokedex__details-column">
                <h3>Moves:</h3>
                <ul>
                    {pokemonDetails.moves?.map((move, index) => (
                        <li key={index}>{move.move.name}</li>
                    ))}
                </ul>
            </div>
        </div>
        <div className="pokedex__details-row">
            <div className="pokedex__details-column">
                <h3>Evolutions</h3>
            </div>
        </div>
        {pokemonDetails.evolutionDisplay && (
            <ul className="pokedex__details-row" id="pokedex__details-evolutionChain">
                {pokemonDetails.evolutionDisplay.map((evolution, index) => (
                    <li key={index}>{evolution}</li>
                ))}
            </ul>
        )}
    </div>
);

export default PokemonDetails;