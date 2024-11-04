import { useEffect, useMemo, useState } from "react";
import { fetchAllPokemon, fetchPokemonDetailsByName } from "./api";

function App() {
    const [pokemonIndex, setPokemonIndex] = useState([])
    const [pokemon, setPokemon] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [pokemonDetails, setPokemonDetails] = useState()

    useEffect(() => {
        const fetchPokemon = async () => {
            const { results: pokemonList } = await fetchAllPokemon()
            setPokemon(pokemonList)
        }
        fetchPokemon().then(() => {

        })
    }, [])



    const filteredPokemon = useMemo(() => {
        const lowerCaseSearch = searchValue.toLowerCase();
        return pokemon.filter(monster => monster.name.toLowerCase().includes(lowerCaseSearch));
    }, [pokemon, searchValue]);

    const onSearchValueChange = (event) => {
        setSearchValue(event.target.value);
    }

    const onGetDetails = (name) => async () => {
        const fetchPokemonDetails = async () => {
            const response = await fetchPokemonDetailsByName(name)
            console.log("pokemon: ", response)
            setPokemonDetails(response)
        }
        fetchPokemonDetails().then(() => {

        })
    }

    return (
        <div className={'pokedex__container'}>
            <div className={'pokedex__search-input'}>
                <input value={searchValue} onChange={onSearchValueChange} placeholder={'Search Pokemon'} />
            </div>
            <div className={'pokedex__content'}>
                {filteredPokemon.length > 0 ? (
                    <div className={'pokedex__search-results'}>
                        {
                            filteredPokemon.map(monster => {
                                return (
                                    <div className={'pokedex__list-item'} key={monster.name}>
                                        <div className={'pokedex__list-content'}>
                                            <div>
                                                {monster.name}
                                            </div>
                                            <button onClick={onGetDetails(monster.name)}>Get Details</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                ) : (
                    <div>No Results Found</div>
                )}
            </div>
            {pokemonDetails && (
                <div className={'pokedex__details'}>
                    <h2>{pokemonDetails.name}</h2>
                    <h3>Types:</h3>
                    <ul>
                        {pokemonDetails.types.map((type, index) => (
                            <li key={index}>{type.type.name}</li>
                        ))}
                    </ul>
                    <h3>Moves:</h3>
                    <ul>
                        {pokemonDetails.moves.map((move, index) => (
                            <li key={index}>{move.move.name}</li>
                        ))}
                    </ul>
                </div>
            )
            }
        </div>
    );
}

export default App;
