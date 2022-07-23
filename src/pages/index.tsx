import type { NextPage } from "next";
import { getOptionsforVote } from "../utils/getRandomPokemon";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const hello = trpc.useQuery(["example.hello", { text: "from PokeAPI" }]);
  const [first, second] = getOptionsforVote();

  return (
    <>
      <div className="h-screen w-screen flex flex-col justify-center items-center">
        <div className="text-2xl text-center">Which Pokemon is Rounder? <div className="text-base">{hello.data ? <p>{hello.data.greeting}</p> : <p>Loading..</p>}</div></div>
        <div className="p-2" />
        <div className="border rounded p-8 flex justify-between max-w-2xl items-center">
          <div className="w-16 h-16 bg-teal-800 justify-center items-center flex">{first}</div>
          <div className="p-8">Vs</div>
          <div className="w-16 h-16 bg-teal-800 justify-center items-center flex">{second}</div>
        </div>
      </div>
    </>
  );
};

export default Home;
