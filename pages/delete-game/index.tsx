import React from "react";
import { useDispatch } from "react-redux";
import { deleteGame } from "../../redux/gameSlice"; // Adjust this import to your game slice
import type { AppDispatch } from "../../redux/store";
import { Game } from "../../types/game"; // Adjust this import to your game type
import GameForm from "@/components/GameForm"; // Assuming you have a GameForm component
import { Typography, Link as MUILink } from "@mui/material";

const DeleteGamePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (game: Game) => {
    if (typeof game.id === "number") {
      dispatch(deleteGame(game.id)); // Ensure deleteGame action uses the game ID
    } else {
      // Handle the case where game.id is undefined
      console.error("Game ID is undefined");
    }
  };

  return (
    <div>
      <Typography variant="h1">Delete Game</Typography>

      <GameForm onSubmit={handleSubmit} mode="delete" />

      <MUILink href="/" underline="hover">
        <Typography variant="h4">Return Home</Typography>
      </MUILink>
    </div>
  );
};

export default DeleteGamePage;
