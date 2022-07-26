import type { NextPage } from "next";
import { getOptionsforVote } from "../utils/getRandomPokemon";
import { inferQueryResponse, trpc } from "../utils/trpc";
import { useState } from "react";
import type React from "react";

const btn = "inline-flex items-center px-2.5 py-1.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from PokeAPI" }]);
  const [ids, updateIds] = useState(() => getOptionsforVote());
  const [first = 1, second = 2] = ids;

  const firstPokemon = trpc.useQuery(["pokemon.get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["pokemon.get-pokemon-by-id", { id: second }]);
  
  const voteForRoundest = (selected: number) => {
    // todo: fire mutation to persist changes
    updateIds(getOptionsforVote());
  }

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="text-2xl text-center">Which Pokemon is Rounder? <div className="text-base">{hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}</div></div>
        <div className="p-2" />
        <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
          {!firstPokemon.isLoading &&
            firstPokemon.data &&
            !secondPokemon.isLoading &&
            secondPokemon.data && (
              <>
                <PokemonListing pokemon={firstPokemon.data} vote={() => voteForRoundest(first)}/>
                <div className="p-8">Vs</div>
                <PokemonListing pokemon={secondPokemon.data} vote={() => voteForRoundest(second)}/>
              </>
          )}
          <div className="p-4"></div>
        </div>
      </div>
    </>
  );
};

type PokemonFromServer = inferQueryResponse<"pokemon.get-pokemon-by-id">;

const PokemonListing: React.FC<{pokemon: PokemonFromServer, vote: () => void}> = (props) => {
  return (
    <div className="flex flex-col items-center">
      <img
        src={props.pokemon.sprites.front_default}
        alt=""
        className="w-64 h-64"
      />
      <div className="text-xl text-center capitalize mt-[-2rem]">
        {props.pokemon.name}
      </div>
      <button onClick={() => props.vote()} className={btn}>Rounder</button>
    </div>
  )
}

export default Home;
