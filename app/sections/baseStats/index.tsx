import React from "react";

type Props = any;

export function BaseStats({ pokemon }: Props) {
  return (
    <div className="flex flex-col px-7 py-10 gap-3 capitalize">
      {pokemon.stats.map((data: any) => (
        <div key={data.stat.name} className="grid grid-cols-3">
          <div>
            {data.stat.name === "hp"
              ? data.stat.name.toUpperCase()
              : data.stat.name.includes("special")
              ? data.stat.name.replace("special-", "sp. ")
              : data.stat.name}
          </div>
          <div className="col-span-2 grid grid-cols-5 items-center gap-4 w-full">
            <span className="col-span-1">{data.base_stat}</span>
            <div
              style={{
                width: `${data.base_stat}%`,
                maxWidth: "100%",
              }}
              className={`h-[8px] flex-10 col-start-2 col-end-5 ${
                data.base_stat > 75
                  ? "bg-green-500"
                  : data.base_stat > 50
                  ? "bg-yellow-500"
                  : data.base_stat > 25
                  ? "bg-red-500"
                  : "bg-red-700"
              }`}
            />
          </div>
        </div>
      ))}

      {/* <div className="grid max-[608px]:grid-cols-2 grid-cols-3">
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
      </div> */}
    </div>
  );
}
