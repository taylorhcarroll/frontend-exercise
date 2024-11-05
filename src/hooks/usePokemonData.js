import { useEffect, useState, useMemo } from "react";
import { fetchAllPokemon, fetchEvolutionChainById, fetchPokemonDetailsByName, fetchPokemonSpeciesByName } from "../api/api"

const usePokemonData = () => {
    const [pokemon, setPokemon] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [pokemonDetails, setPokemonDetails] = useState({});

    useEffect(() => {
        const fetchPokemon = async () => {
            const { results: pokemonList } = await fetchAllPokemon();
            setPokemon(pokemonList);
        };
        fetchPokemon();
    }, []);

    const filteredPokemon = useMemo(() => {
        const lowerCaseSearch = searchValue.toLowerCase();
        return pokemon.filter(monster => monster.name.toLowerCase().includes(lowerCaseSearch));
    }, [pokemon, searchValue]);

    const onSearchValueChange = (event) => {
        setSearchValue(event.target.value);
    };

    const parseEvolutionChain = (chain) => {
        const evolutionChain = [];
        const traverseChain = (stage) => {
            evolutionChain.push(stage.species.name);
            stage.evolves_to.forEach(evolution => traverseChain(evolution));
        };
        traverseChain(chain);
        return evolutionChain;
    };

    const onGetDetails = (name) => async () => {
        const details = await fetchPokemonDetailsByName(name);
        setPokemonDetails(details);

        const species = await fetchPokemonSpeciesByName(name);
        if (species.evolution_chain?.url) {
            const evolutionChain = await fetchEvolutionChainById(species.evolution_chain.url.split('/').slice(-2, -1)[0]);
            const evolutionDisplay = parseEvolutionChain(evolutionChain.chain);
            setPokemonDetails(prev => ({ ...prev, evolutionDisplay }));
        }
    };

    return {
        filteredPokemon,
        searchValue,
        onSearchValueChange,
        pokemonDetails,
        onGetDetails,
    };
};

export default usePokemonData;