/* eslint-disable @next/next/no-img-element */
"use client";
//React
import { useEffect, useState } from "react";
import usePokemonAPI from "@/app/hooks/usePokemonAPI";

//Constants
import { typeColors } from "@/app/constants/colors";

//Components
import { About, BaseStats, Evolution, Moves } from "@/app/sections";
import pokeball from "@/public/pokeball.png";
import Image from "next/image";

export default function PokemonDetailPage(props: any) {
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
  const { getPokemonDetail, getPokemonSpecies, formatNumberToCode } =
    usePokemonAPI();

  const fetchPokemonDetail = async () => {
    try {
      const res = await getPokemonDetail(props.params.id);
      const species = await getPokemonSpecies(props.params.id);
      setPokemon({ ...res, species: species });
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
      <div className="flex justify-between items-center w-full p-7 pb-0">
        <div className="flex flex-col gap-3">
          <h2 className="text-4xl font-semibold text-slate-100 capitalize">
            {pokemon.name}
          </h2>
          <div className="flex gap-2">
            {pokemon.types.map((type: any) => (
              <span
                key={type.slot}
                className="rounded-xl bg-[#ffffff4d] text-md text-slate-100 px-2 py-0.5 capitalize"
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>
        <span className="text-xl text-slate-100">
          {formatNumberToCode(pokemon.id)}
        </span>
      </div>
      <div className="relative w-full">
        <img
          className="w-56 h-auto z-10 relative m-auto"
          src={pokemon?.sprites.other["official-artwork"].front_default}
          alt={pokemon?.name}
        />
        <Image
          className="absolute right-[-10%] top-0 opacity-70 z-9"
          src={pokeball}
          alt="pokeball"
          width={250}
          height={250}
        />
      </div>
      <div className="h-full bg-white w-full rounded-t-[50px] mt-[-10%] pt-[10%]">
        <div className="flex justify-between text-lg sm:text-2xl px-7">
          {menuItems.map((item: { title: string }) => (
            <span
              key={item.title}
              className={`${
                selectedSection?.title === item.title
                  ? "font-bold border-b-2 border-black"
                  : ""
              } capitalize cursor-pointer transition-all ease-in-out duration-300  z-20`}
              onClick={() => setSelectedSection(item)}
            >
              {item.title}
            </span>
          ))}
        </div>
        {selectedSection?.title === "about" ? (
          <About pokemon={pokemon} />
        ) : selectedSection?.title === "base stats" ? (
          <BaseStats pokemon={pokemon} />
        ) : selectedSection?.title === "evolution" ? (
          <Evolution />
        ) : selectedSection?.title === "moves" ? (
          <Moves />
        ) : (
          <h1>Coming soon!</h1>
        )}
      </div>
    </div>
  ) : (
    <h1>Loading...</h1>
  );
}
