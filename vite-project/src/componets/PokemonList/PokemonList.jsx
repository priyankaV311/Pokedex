
import { useEffect, useState } from "react"
import axios from 'axios';
import "./PokemonList.css"
import Pokemon from "../Pokemon/Pokemon";
const PokemonList = ({ search }) => {

    

    const [ pokemonListState, setPokemonListState ] = useState({
        pokemonList: [],
        isLoading: true,
        pokedexUrl: "https://pokeapi.co/api/v2/pokemon/",
        nextUrl: "",
        prevUrl: ""
    })

    async function downloadPokemons() {
        
        setPokemonListState((state) => ({...state, isLoading: true}))
        const response = await axios.get(pokemonListState.pokedexUrl); 
        

        const pokemonResults = response.data.results; 
        
        setPokemonListState((state) => ({
            ...state, 
            nextUrl: response.data.next, 
            prevUrl: response.data.prev
        }))
         
        
        const pokemonResultPromise = pokemonResults.map((pokemon) => axios.get(pokemon.url))
    

        
        const pokemonData = await axios.all(pokemonResultPromise) 
        

        
        const pokeListResult = pokemonData.map((pokeData) => {
            const pokemon = pokeData.data;
            
            return {
                id: pokemon.id,
                name: pokemon.name, 
                image: pokemon.sprites.other.dream_world.front_default, 
                types: pokemon.types
            }
        });

        
        setPokemonListState((state) => ({
            ...state, 
            pokemonList: pokeListResult, 
            isLoading: false
        }));
        
    }

    useEffect(() => {
        downloadPokemons();
    }, [pokemonListState.pokedexUrl])

    const filteredPokemonList = pokemonListState.pokemonList.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="pokemon-list-wrapper">
        <div className="pokemon-wrapper">
            {(pokemonListState.isLoading) ? 'Loading...' : 
                filteredPokemonList.map((p) => (
                    <Pokemon name={p.name} image={p.image} id={p.id} key={p.id} />)
            )}
        </div>
        <div className="controls">
            
            <button disabled={pokemonListState.prevUrl == null} onClick={() => setPokemonListState({...pokemonListState, pokedexUrl: pokemonListState.prevUrl})} >Prev</button>
            
            <button disabled={pokemonListState.nextUrl == null} onClick={() => setPokemonListState({...pokemonListState, pokedexUrl: pokemonListState.nextUrl})} >Next</button>
        </div>
    </div>
  )
}

export default PokemonList;