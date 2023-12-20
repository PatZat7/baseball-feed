import { RootState } from "./store"; // Import the type of the root state
import { createSelector } from "@reduxjs/toolkit";

const getGameScheduleSlice = (state: RootState) => state["games"];

// export const getGameById = (id: number) =>
//   createSelector(
//     getGameScheduleSlice,
//     (gameSlice) => gameSlice.games.find((game) => game.id === id) || {}
//   );

// Basic selector to get the games array
const selectGames = (state: RootState) => state.games.games;

// Memoized selector to get a game by ID
export const selectGameById = createSelector(
  [selectGames, (state: RootState, id: number) => id],
  (games, id) => games.find((game) => game.id === id)
);
