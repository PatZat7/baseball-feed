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
      <Schedule onSubmit={handleSubmit}></Schedule>
    </div>
  );
};

export default GameDetailPage;
