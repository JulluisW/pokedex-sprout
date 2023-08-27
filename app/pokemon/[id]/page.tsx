/* eslint-disable @next/next/no-img-element */
"use client";
//React
import { useEffect, useState } from "react";
import usePokemonAPI from "@/app/hooks/usePokemonAPI";

//Constants
import { typeColors } from "@/app/constants/colors";
import { About, BaseStats, Evolution, Moves } from "@/app/sections";

export default function PokemonListPage(props: any) {
  //State
  const [pokemon, setPokemon] = useState<any>(null);
  const [selectedSection, setSelectedSection] = useState<{
    title: string;
  } | null>(null);

  //Constants
  const menuItems = [
    { title: "about" },
    { title: "base stats" },
    { title: "evolution" },
    { title: "moves" },
  ];

  //Hooks
  const { getPokemonDetail } = usePokemonAPI();

  const fetchPokemonDetail = async () => {
    try {
      const res = await getPokemonDetail(props.params.id);
      setPokemon(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPokemonDetail();
    setSelectedSection(menuItems[0]);
  }, []);

  return pokemon ? (
    <div
      className={`flex flex-col items-center bg-no-repeat overflow-hidden relative h-screen`}
      style={{
        backgroundColor: typeColors[`${pokemon.types[0].type.name}`],
      }}
    >
      <h2 className="text-xl text-slate-100 capitalize">{pokemon.name}</h2>
      <div className="flex gap-2">
        {pokemon.types.map((type: any) => (
          <span
            key={type.slot}
            className="rounded-xl bg-[#ffffff4d] text-md text-slate-100 px-1 py-0.5 capitalize"
          >
            {type.type.name}
          </span>
        ))}
      </div>
      <img
        className="w-56 h-auto z-10"
        src={pokemon?.sprites.other["official-artwork"].front_default}
        alt={pokemon?.name}
      />
      <div className="h-full bg-white w-full rounded-t-[50px] mt-[-10%] pt-[10%]">
        <div className="flex justify-evenly sm:text-2xl">
          {menuItems.map((item: { title: string }) => (
            <span
              key={item.title}
              className={`${
                selectedSection?.title === item.title
                  ? "font-bold border-b-2 border-black"
                  : ""
              } capitalize cursor-pointer transition-all ease-in-out duration-300`}
              onClick={() => setSelectedSection(item)}
            >
              {item.title}
            </span>
          ))}
        </div>
        {selectedSection?.title === "about" ? (
          <About pokemon={pokemon} />
        ) : null}
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
