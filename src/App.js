import { useRef, useEffect } from "react";
import SearchInput from "./components/Search/SearchInput"
import PokemonDetails from "./components/Details/Details"
import usePokemonData from "../src/hooks/usePokemonData";
import SearchResults from "./components/Search/SearchResults";

function App() {
    const {
        filteredPokemon,
        searchValue,
        onSearchValueChange,
        pokemonDetails,
        onGetDetails,
    } = usePokemonData();

    //adding this details ref to keep track of the focus, mostly useful for screenreaders in this case
    const detailsRef = useRef(null);

    useEffect(() => {
        if (Object.keys(pokemonDetails).length > 0 && detailsRef.current) {
            detailsRef.current.focus();
        }
    }, [pokemonDetails]);

    return (
        <div className={'pokedex__container'}>
            <SearchInput
                searchValue={searchValue}
                onSearchValueChange={onSearchValueChange}
            />
            <div className={'pokedex__content'}>
                <SearchResults
                    filteredPokemon={filteredPokemon}
                    onGetDetails={onGetDetails}
                />
                {Object.keys(pokemonDetails).length > 0 && (
                    <PokemonDetails pokemonDetails={pokemonDetails} detailsRef={detailsRef} />
                )}
            </div>
        </div >
    );
}

export default App;
