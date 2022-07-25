import type { NextPage } from "next";
import { getOptionsforVote } from "../utils/getRandomPokemon";
import { trpc } from "../utils/trpc";
import { useState } from "react";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from PokeAPI" }]);
  const [ids, updateIds] = useState(() => getOptionsforVote());
  const [first = 1, second = 2] = ids;

  const firstPokemon = trpc.useQuery(["pokemon.get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["pokemon.get-pokemon-by-id", { id: second }]);

  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;
  

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="text-2xl text-center">Which Pokemon is Rounder? <div className="text-base">{hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}</div></div>
        <div className="p-2" />
        <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
          <div className="w-64 h-64 bg-teal-800 justify-center items-center flex">
            <img src={firstPokemon.data?.sprites.front_default} alt="" className="w-full"/>
          </div>
          <div className="p-8">Vs</div>
          <div className="w-64 h-64 bg-teal-800 justify-center items-center flex">
            <img src={secondPokemon.data?.sprites.front_default} alt="" className="w-full"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
