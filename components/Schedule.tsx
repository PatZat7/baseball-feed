import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Game } from "../types/game"; // Assuming you have this Game interface defined in the types
import { useSelector } from "react-redux";
//import { selectGameById, getGameById } from "../../redux/scheduleSelectors";
import { RootState } from "../redux/store";

const Schedule: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const router = useRouter();
  const { id } = router.query;
  //const [game, setUpdatedGame] = useState<Game | null>(null);
  const game = useSelector((state: RootState) => state.games.games);

  const gameId = Array.isArray(id)
    ? parseInt(id[0], 10)
    : parseInt(id as string, 10);

  //Create a new selector instance for the specific game ID
  // const game = useSelector((state: RootState) => {
  //   if (typeof state.games.games === "undefined" || gameId == null) {
  //     return null;
  //   }

  //   return state.games.games.find((game) => game.id === gameId);
  // });

  // Use the newly created selector with useSelector

  //   const storedGame = useSelector((state: RootState) =>
  //     selectGameById(state, gameId)
  //   );
  //const gameSlug = useSelector(getGameById(gameId));

  //   useEffect(() => {
  //     console.log("id", id);
  //     console.log("GAME", gameData);
  //   }, [id]);

  useEffect(() => {
    // console.log("slug", gameSlug);
    console.log("GAME", game);
    setGames(game);
  }, [game]);
  //create selectors fetch game data from redux
  //add the update form to here

  return (
    <div>
      <h2>Games</h2>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            <a>
              {game.home_team.name} vs {game.away_team.name} - {game.venue}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Schedule;
