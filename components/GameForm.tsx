import React, { useState } from "react";
import { Button, Box, Typography, Paper, TextField } from "@mui/material";
import { Game } from "../types/game"; // Assuming you have this Game interface defined in the types
import { useRouter } from "next/router";

interface GameFormProps {
  game?: Game;
  onSubmit: (data: Game) => void;
  mode: "add" | "update" | "delete";
}

const GameForm: React.FC<GameFormProps> = ({ game, onSubmit, mode }) => {
  const router = useRouter();
  const [formData, setFormData] = useState(
    game || {
      id: 0,
      date_time: "",
      official_date: "",
      channel: {
        id: 0,
        name: "",
        public_cdn_url: "https://ballys_cdn.com/channel_1/playlist.m3u8",
      },
      no_broadcast: false,
      status: "",
      venue: "",
      home_team: {
        id: 0,
        name: "",
        abbreviation: "",
      },
      away_team: {
        id: 0,
        name: "",
        abbreviation: "",
      },
      score: {
        inning: 0,
        inning_half: "",
        home_score: 0,
        away_score: 0,
      },
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    router.push("/");
  };

  return (
    <div>
      <Typography
        color="secondary"
        sx={{ fontSize: "1.5rem", margin: "2rem auto" }}
      >
        {mode === "add" ? "Add New" : mode === "update" ? "Update" : "Delete"}
        Game
      </Typography>

      <form onSubmit={handleSubmit}>
        {/* Game Form Fields */}
        {/* Replace or modify fields as per the Game interface */}
        {/* Example for a simple field: */}
        <Box>
          <TextField
            label="Date Time"
            variant="standard"
            type="text"
            name="date_time"
            value={formData.date_time}
            onChange={handleChange}
          />
        </Box>
        {/* Continue with other fields such as official_date, home_team, away_team, etc. */}

        <Button
          color="secondary"
          variant="contained"
          size="large"
          type="submit"
          sx={{ margin: "1rem 0" }}
        >
          {mode === "add"
            ? "Add New Game"
            : mode === "update"
            ? "Update Game"
            : "Delete Game"}
        </Button>
      </form>
    </div>
  );
};

export default GameForm;
