//You are working with data from a baseball property that will be used in the broadcast and stats feed
//  consumer-facing application.
//    -retrieve data from the baseball property’s API and provide it to our consumer-facing app.
//    -only contains information about games
//    - The consumer-facing app only needs data from the current date.
//    - https://baseball.com/api/schedule/gameById/{id}
//    - if inProgress, use recursive refetch
//   internal user cms interface
//      -overwrite provided data and add additional broadcast information from a front-end
//      -before it is provided to the consumer-facing application.
//      -front-end needs to access data for the next 7 days, so internal users can add/modify   data ahead of the day the games will be played.
//      -schedule API endpoint has a high latency so you must minimize requests to that - GET https://baseball.com/api/schedule/{official_date}
//      -The individual game endpoint does not have these limitations. https://baseball.com/api/schedule/gameById/{id}
//      -NO CACHING - kept delete in in case a internal user messes up
//
//

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Game } from "../types/game"; // Assuming you have this Game interface defined in the types
import axios from "axios";

interface GamesState {
  games: Game[];
}

const initialState: GamesState = {
  games: [
    {
      id: 738542,
      date_time: "2023-12-15T22:35:00Z",
      official_date: "2023-12-19",
      channel: {
        id: 2,
        name: "Baseball 2",
        public_cdn_url: "https://ballys_cdn.com/channel_1/playlist.m3u8",
      },
      no_broadcast: false,
      status: "Pre-Game",
      venue: "Harbor Park",
      home_team: {
        id: 568,
        name: "Bloomington Blackhawks",
        abbreviation: "BLO",
      },
      away_team: {
        id: 234,
        name: "Troyville Colts",
        abbreviation: "TRY",
      },
      score: {
        inning: 0,
        inning_half: "TOP",
        home_score: 0,
        away_score: 0,
      },
    },
  ],
};

export const fetchGames = createAsyncThunk<Game[], string>(
  "games/fetchGames",
  async (todaysDate) => {
    try {
      const response = await axios.get(`/api/schedule`, {
        params: { date: todaysDate },
      });
      return response.data; // Axios automatically parses the JSON response
    } catch (error) {
      throw new Error(error.response?.data?.message || "Failed to fetch games");
    }
  }
);

export const addGame = createAsyncThunk<Game, Game, { rejectValue: string }>(
  "games/addGame",
  async (newGame: Game, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGame),
      });
      if (!response.ok) {
        throw new Error("Failed to add game");
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const deleteGame = createAsyncThunk(
  "games/deleteGame",
  async (gameId: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/schedule/gameById/${gameId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete game");
      }
      return gameId; // Return the ID of the deleted game
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const updateGame = createAsyncThunk(
  "games/updateGame",
  async (game: Game, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/schedule/gameById/${game.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(game),
      });
      if (!response.ok) {
        throw new Error("Failed to update game");
      }
      return game; // Return the updated game
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const gameSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.pending, (state) => {
        // Handle loading state
      })
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.games = action.payload;
      })
      .addCase(fetchGames.rejected, (state) => {
        // Handle error state
      })
      .addCase(addGame.fulfilled, (state, action: PayloadAction<Game>) => {
        state.games.push(action.payload);
      })
      .addCase(addGame.rejected, (state, action) => {
        // Handle the error
        console.error("Failed to add game:", action.payload);
      })
      .addCase(updateGame.fulfilled, (state, action) => {
        const index = state.games.findIndex((g) => g.id === action.payload.id);
        if (index !== -1) {
          state.games[index] = action.payload;
        }
      })
      .addCase(deleteGame.fulfilled, (state, action: PayloadAction<number>) => {
        state.games = state.games.filter((game) => game.id !== action.payload);
      })
      .addCase(deleteGame.rejected, (state, action) => {
        // Handle the error
        console.error("Failed to delete game:", action.payload);
      });
  },
});

export default gameSlice.reducer;
