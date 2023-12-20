import React from "react";
import { useDispatch } from "react-redux";
import { updateGame } from "../../redux/gameSlice"; // Adjust this import to your game slice
import type { AppDispatch } from "../../redux/store";
import { Game } from "../../types/game"; // Adjust this import to your game type
import GameForm from "@/components/GameForm"; // Assuming you have a GameForm component
import { Typography, Link as MUILink } from "@mui/material";
import Schedule from "../../components/Schedule";
const UpdateGamePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (game: Game) => {
    dispatch(updateGame(game));
  };

  return (
    <div>
      <Typography variant="h1">Update Game</Typography>

      <Schedule onSubmit={handleSubmit} />

      <MUILink href="/" underline="hover">
        <Typography variant="h4">Return Home</Typography>
      </MUILink>
    </div>
  );
};

export default UpdateGamePage;
