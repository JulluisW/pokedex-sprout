/* eslint-disable @next/next/no-img-element */
"use client";
//React
import { useEffect, useState } from "react";

//API
import usePokemonAPI from "../hooks/usePokemonAPI";

//Components
import { Pagination } from "../components";

export default function PokemonDetailPage() {
  //States
  const [pokemons, setPokemons] = useState([]);
  const [count, setCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  //Constants

  //Hooks
  const { getPokemons, getPokemonDetail } = usePokemonAPI();

  const fetchPokemon = async () => {
    try {
      const res = await getPokemons(
        pageSize * currentPage - pageSize,
        pageSize
      );
      if (typeof res === "object") {
        const updatedPokemonDatas: any = await Promise.all(
          res.results.map(async (pokemon: any) => {
            return await getPokemonDetail(pokemon.name);
          })
        );
        console.log(updatedPokemonDatas);
        setCount(res.count);
        setPokemons(updatedPokemonDatas);
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold">Pokedex</h1>
      <div
      // className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`}
      >
        {pokemons.map((pokemon: any) => (
          <div
            // style={{
            //   background: "#78c850",
            // }}
            className={`bg-${pokemon.types[0].type.name}`}
            key={pokemon.id}
          >
            <div className={`bg-electric`}>
              <h2 className="text-4xl text-psychic">{pokemon.name}</h2>
              <div>
                {pokemon.types.map((type: any) => (
                  <span key={type.slot}>{type.type.name}</span>
                ))}
              </div>
            </div>
            <img src={pokemon?.sprites?.front_default} alt={pokemon.name} />
          </div>
        ))}
      </div>
      <Pagination
        currentPage={0}
        totalPages={0}
        pageSize={0}
        onPageChange={(a) => console.log(a)}
      />
    </div>
  );
}
