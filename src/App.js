import { useEffect, useMemo, useState, useRef } from "react";
import { fetchAllPokemon, fetchEvolutionChainById, fetchPokemonDetailsByName, fetchPokemonSpeciesByName } from "./api/api";

function App() {
    const [pokemonIndex, setPokemonIndex] = useState([])
    const [pokemon, setPokemon] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [pokemonDetails, setPokemonDetails] = useState({})
    //adding this details ref to keep track of the focus, mostly useful for screenreaders in this case
    const detailsRef = useRef(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            const { results: pokemonList } = await fetchAllPokemon()
            setPokemon(pokemonList)
        }
        fetchPokemon().then(() => {

        })
    }, [])

    useEffect(() => {
        if (Object.keys(pokemonDetails).length > 0 && detailsRef.current) {
            detailsRef.current.focus();
        }
    }, [pokemonDetails]);

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
        fetchPokemonDetails().then(() => {
            // const fetchEvolutionChain = await fetchEvolutionChainById(species.)
            // const evolutionChain =
            //}
        })
    }

    return (
        <div className={'pokedex__container'}>
            <div className={'pokedex__search-input'}>
                <input
                    value={searchValue}
                    onChange={onSearchValueChange}
                    placeholder={'Search Pokemon'}
                    aria-label="Search Pokemon" />
            </div>
            <div className={'pokedex__content'}>
                <div className={'pokedex__search-results'}>
                    {filteredPokemon.length > 0 ? (

                        filteredPokemon.map(monster => {
                            return (
                                <div className={'pokedex__list-item'} key={monster.name}>
                                    <div className={'pokedex__list-content'}>
                                        <div>
                                            {monster.name}
                                        </div>
                                        <button onClick={onGetDetails(monster.name)} aria-label={`Get details about ${monster.name}`}>Get Details</button>
                                    </div>
                                </div>
                            )
                        })
                    ) : (
                        <div className={'pokedex__list-item'}>
                            <div className={'pokedex__list-content'}>
                                No Results Found
                            </div>
                        </div>
                    )}
                </div>
                {Object.keys(pokemonDetails).length > 0 && (
                    <div className={'pokedex__details'}
                        ref={detailsRef}
                        role="region"
                        aria-live="polite"
                        aria-labelledby="pokedex-details-title">
                        <div className={"pokedex__details-row"}>
                            <h2 className={"pokedex__details-title"} id={"pokedex__details-title"}>{pokemonDetails.name}</h2>
                        </div>
                        <div className={"pokedex__details-row"}>
                            {/* I know this is not in the mockup, but I want to show alt text is important. Can be removed */}
                            {pokemonDetails.sprites && (
                                <img id={"pokedex__details-sprite"} alt={`${pokemonDetails.name} front sprite`} src={pokemonDetails.sprites.front_default}></img>
                            )}
                        </div>
                        <div className={"pokedex__details-row"}>
                            <div className={"pokedex__details-column"}>
                                <h3>Types:</h3>
                                <ul>
                                    {pokemonDetails.types?.map((type, index) => (
                                        <li key={index}>{type.type.name}</li>
                                    ))}
                                </ul>
                            </div>
                            <div className={"pokedex__details-column"}>
                                <h3>Moves:</h3>
                                <ul>
                                    {pokemonDetails.moves?.map((move, index) => (
                                        <li key={index}>{move.move.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className={"pokedex__details-row"}>
                            <div className={"pokedex__details-column"}>
                                <h3>Evolutions</h3>
                            </div>
                        </div>
                        {pokemonDetails.evolutionDisplay && (
                            <ul className={"pokedex__details-row"} id={"pokedex__details-evolutionChain"}>
                                {pokemonDetails.evolutionDisplay.map((evolution, index) => (
                                    <li key={index}>{evolution}</li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </div >
    );
}

export default App;
