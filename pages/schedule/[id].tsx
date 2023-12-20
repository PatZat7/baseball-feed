import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateGame } from "../../redux/gameSlice"; // Adjust this import to your game slice
import type { AppDispatch } from "../../redux/store";
import Schedule from "../../components/Schedule";
//import { selectGameById, getGameById } from "../../redux/scheduleSelectors";
import { RootState } from "../../redux/store";
import { Game } from "../../types/game";

interface UpdateGamePageProps {
  gameData?: Game;
  onSubmit: (gameData: Game) => void;
}

const GameDetailPage: React.FC<UpdateGamePageProps> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (game: Game) => {
    dispatch(updateGame(game));
  };

  return (
    <div>
      {/* <h2>Game Detail</h2>
      <p>Date and Time: {game.date_time}</p>
      <p>Official Date: {game.official_date}</p>
      <p>Venue: {game.venue}</p>
      <p>Status: {game.status}</p>

      <h3>Home Team</h3>
      <p>Name: {game.home_team.name}</p>
      <p>Abbreviation: {game.home_team.abbreviation}</p>

      <h3>Away Team</h3>
      <p>Name: {game.away_team.name}</p>
      <p>Abbreviation: {game.away_team.abbreviation}</p>

      <h3>Score</h3>
      <p>Inning: {game.score.inning}</p>
      <p>Inning Half: {game.score.inning_half}</p>
      <p>Home Score: {game.score.home_score}</p>
      <p>Away Score: {game.score.away_score}</p> */}

      <Schedule onSubmit={handleSubmit}></Schedule>

      {/* {game.no_broadcast && <p>No Broadcast</p>} */}
    </div>
  );
};

export default GameDetailPage;
