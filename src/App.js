import { useEffect, useMemo, useState } from "react";
import { fetchAllPokemon, fetchEvolutionChainById, fetchPokemonDetailsByName, fetchPokemonSpeciesByName } from "./api";

function App() {
    const [pokemonIndex, setPokemonIndex] = useState([])
    const [pokemon, setPokemon] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [pokemonDetails, setPokemonDetails] = useState({})

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

    const parseEvolutionChain = (chain) => {
        const evolutionChain = [];
        const traverseChain = (stage) => {
            evolutionChain.push(stage.species.name);
            //eevee makes this a little complicated since it's a split evo path
            stage.evolves_to.forEach(evolution => {
                traverseChain(evolution);
            });
        };

        traverseChain(chain);
        return evolutionChain;
    };

    const onGetDetails = (name) => async () => {
        const fetchPokemonDetails = async () => {
            const details = await fetchPokemonDetailsByName(name)
            console.log("pokemon: ", details)
            setPokemonDetails(details)
            const species = await fetchPokemonSpeciesByName(name)
            console.log("species :", species)

            if (species.evolution_chain?.url) {
                const evolutionChain = await fetchEvolutionChainById(species.evolution_chain.url.split('/').slice(-2, -1)[0]);
                console.log("evolutionChain:", evolutionChain);
                const evolutionDisplay = parseEvolutionChain(evolutionChain.chain)
                console.log("evo display: ", evolutionDisplay)
                setPokemonDetails(prev => ({
                    ...prev,
                    evolutionDisplay
                }));
                console.log("pokemonDetails updated: ", pokemonDetails)
            }
        }
        // const fetchPokemonSpecies = async () => {
        //     const response = await fetchPokemonSpeciesByName(name)
        //     console.log("species :", response)
        //     setPokemon
        // }
        fetchPokemonDetails().then(() => {
            // const fetchEvolutionChain = await fetchEvolutionChainById(species.)
            // const evolutionChain =
            //}
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
                    {/* I know this is not in the mockup, but I want to show alt text is important. Can be removed */}
                    {pokemonDetails.sprites && (
                        <img alt={`${pokemonDetails.name}_sprite_front`} src={pokemonDetails.sprites.front_default}></img>
                    )}
                    <h3>Types:</h3>
                    <ul>
                        {pokemonDetails.types?.map((type, index) => (
                            <li key={index}>{type.type.name}</li>
                        ))}
                    </ul>
                    <h3>Moves:</h3>
                    <ul>
                        {pokemonDetails.moves?.map((move, index) => (
                            <li key={index}>{move.move.name}</li>
                        ))}
                    </ul>

                    <h3>Evolutions</h3>
                    {pokemonDetails.evolutionDisplay && (
                        <ul>
                            {pokemonDetails.evolutionDisplay.map((evolution, index) => (
                                <li key={index}>{evolution}</li>
                            ))}
                        </ul>
                    )}
                </div>
            )
            }
        </div >
    );
}

export default App;
