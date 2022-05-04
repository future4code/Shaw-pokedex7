import React, { useEffect, useState } from "react";
import axios from "axios";
import { pokeURL } from "../Constants/pokeURL";
import GlobalStateContext from "./GlobalStateContext";

export const GlobalState = (props) => {
  //ANCHOR Lista de pokemons da home
  const [pokemonList, setPokemonList] = useState([]);
  //ANCHOR lista de pokemons da pokedex
  const [pokedex, setPokedex] = useState([]);
  //ANCHOR para página de detalhes do pokemon
  const [pokemonDetails, setPokemonDetails] = useState([]);

  //ANCHOR variáveis para o provider
  const states = { pokemonList, pokedex, pokemonDetails };
  const setters = { setPokemonList, setPokedex, setPokemonDetails };

  const data = { states, setters };
};

useEffect(() => {
  getPokemons();
}, []);

// TODO  Fazendo ainda o GET
const getPokemons = async () => {
  //ANCHOR Array estratégico para enviar uma única vez ao state
  const listPokemon = [];

  //ANCHOR Cria um array de pokemons de acordo com a quantidade de repetições
  for (let i = 1; i < 21; i++) {
    await axios
      .get(`${pokeURL}/${i}/`)
      .then((response) => {
        listPokemon[i - 1] = {
          id: response.data.id,
          name: response.data.name,
          status: response.data.stats,
          moves: response.data.moves,
          types: response.data.types,
          sprites: response.data.sprites,
        };
        //ANCHOR Se a largura estivar do tamanho que vc desejar,
        //ele vai passar para o state
        // listPokemon.length === 20
        //   ? setPokemonList(listPokemon)
        //   : alert("Erro no GET");
      })
      .catch((error) => {
        alert("error.response");
      });
  }

  return (
    <GlobalStateContext.Provider value={data}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};