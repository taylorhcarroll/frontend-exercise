import { useEffect, useMemo, useState } from "react";
import { fetchAllPokemon } from "./api";

function App() {
    const [pokemonIndex, setPokemonIndex] = useState([])
    //const [pokemon, setPokemon] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [pokemonDetails, setPokemonDetails] = useState()

    useEffect(() => {
        const fetchPokemon = async () => {
            const { results: pokemonList } = await fetchAllPokemon()
            console.log("pokemon: ", pokemonList)
            setPokemonIndex(pokemonList)
        }
        fetchPokemon().then(() => {

        })
    }, [])



    const filteredPokemon = useMemo(() => {
        const lowerCaseSearch = searchValue.toLowerCase();
        return pokemonIndex.filter(monster => monster.name.toLowerCase().includes(lowerCaseSearch));
    }, [pokemonIndex, searchValue]);

    const onSearchValueChange = (event) => {
        setSearchValue(event.target.value);
    }

    const onGetDetails = (name) => async () => {
        /** code here **/
    }

    return (
        <div className={'pokedex__container'}>
            <div className={'pokedex__search-input'}>
                <input value={searchValue} onChange={onSearchValueChange} placeholder={'Search Pokemon'} />
            </div>
            <div className={'pokedex__content'}>
                {filteredPokemon.length > 0 && (
                    <div className={'pokedex__search-results'}>
                        {
                            filteredPokemon.map(monster => {
                                return (
                                    <div className={'pokedex__list-item'} key={monster.name}>
                                        <div>
                                            {monster.name}
                                        </div>
                                        <button onClick={onGetDetails(monster.name)}>Get Details</button>
                                    </div>
                                )
                            })
                        }
                    </div>
                )}
                {
                    pokemonDetails && (
                        <div className={'pokedex__details'}>
                            {/*  code here  */}
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default App;
