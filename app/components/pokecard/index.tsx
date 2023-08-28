/* eslint-disable @next/next/no-img-element */
import { typeColors } from "@/app/constants/colors";
import Image from "next/image";
import pokeball from "@/public/pokeball.png";
import React from "react";
import { useRouter } from "next/navigation";

type Props = any;

export function Pokecard({ pokemon }: Props) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/pokemon/${pokemon.id}`)}
      className="min-h-[150px] cursor-pointer bg-no-repeat overflow-hidden relative rounded-[20px] p-[20px] flex flex-col gap-[10px]"
      style={{
        backgroundColor: typeColors[`${pokemon.types[0].type.name}`],
      }}
      key={pokemon.id}
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
      <Image
        className="absolute right-[-10%] bottom-[-40%] opacity-50"
        src={pokeball}
        alt="pokeball"
        width={200}
        height={200}
      />
      <img
        className="absolute right-[5%] bottom-0 w-[40%] h-auto"
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
      />
    </div>
  );
}
