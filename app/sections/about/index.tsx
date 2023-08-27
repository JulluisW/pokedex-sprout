"use client";

import React from "react";

type Props = any;

export function About({ pokemon }: Props) {
  console.log(pokemon);

  return (
    <div className="flex flex-col px-[20%]">
      <div className="flex gap-10">
        <span>Species</span>
        <span>a</span>
      </div>
      <div className="flex gap-10">
        <span>Height</span>
        <span>{pokemon?.height}</span>
      </div>
      <div className="flex gap-10">
        <span>Weight</span>
        <span>{pokemon?.weight}</span>
      </div>
      <div className="flex gap-10">
        <span>Abilities</span>
        <span>
          {pokemon?.abilities
            .map((ability: any) => ability.ability.name)
            .join(", ")}
        </span>
      </div>
    </div>
  );
}
