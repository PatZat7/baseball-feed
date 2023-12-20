import React from "react";
import GameForm from "@/components/GameForm";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../redux/store";
import { addGame } from "../../redux/gameSlice";
import { Typography, Link as MUILink } from "@mui/material";
import { Game } from "../../types/game";

interface AddGamePageProps {
  gameData?: Game[];
  onSubmit: (gameData: Game) => void;
}

const AddPolicyPage: React.FC<AddGamePageProps> = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = (gameData: Game) => {
    dispatch(addGame(gameData));
  };

  return (
    <div>
      <Typography variant="h1">Add Games</Typography>

      <GameForm onSubmit={handleSubmit} mode="add" />

      <MUILink href="/">
        <h4>Return Home</h4>
      </MUILink>
    </div>
  );
};

export default AddPolicyPage;
