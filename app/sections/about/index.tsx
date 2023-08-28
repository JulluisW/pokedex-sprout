"use client";

import React from "react";

type Props = any;

export function About({ pokemon }: Props) {
  return (
    <div className="flex flex-col px-7 py-10 gap-3">
      <div className="grid max-[608px]:grid-cols-2 grid-cols-3">
        <span>Species</span>
        <span className="font-semibold">
          {
            pokemon.species.genera.find(
              (genus: any) => genus.language.name === "en"
            ).genus
          }
        </span>
      </div>
      <div className="grid max-[608px]:grid-cols-2 grid-cols-3">
        <span>Height</span>
        <span className="font-semibold">{pokemon?.height}</span>
      </div>
      <div className="grid max-[608px]:grid-cols-2 grid-cols-3">
        <span>Weight</span>
        <span className="font-semibold">{pokemon?.weight}</span>
      </div>
      <div className="grid max-[608px]:grid-cols-2 grid-cols-3">
        <span>Abilities</span>
        <span className="capitalize font-semibold">
          {pokemon?.abilities
            .map((ability: any) => ability.ability.name)
            .join(", ")}
        </span>
      </div>
    </div>
  );
}
