import type { NextApiRequest, NextApiResponse } from "next";
import games from "../../../BaseballGames.json"; // Assuming you have a games.json file
import type { Game } from "../../../types/game"; // Assuming Game interface is defined here
import fs from "fs";
import path from "path";

type ScheduleApiResponse =
  | Omit<Game, "channel">[]
  | { message: string; error?: string };

function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ScheduleApiResponse>
) {
  const { date } = req.query;

  if (req.method === "POST") {
    // Add a new game to the schedule
    const newGame = req.body;

    // Read the current games
    const filePath = path.join(process.cwd(), "BaseballGames.json");
    const fileData = fs.readFileSync(filePath);
    const games: Game[] = JSON.parse(fileData.toString());

    games.push({ ...newGame, id: games.length + 1 }); // Generate a new ID
    fs.writeFileSync(filePath, JSON.stringify(games));

    res.status(201).json(newGame);
  } else if (req.method === "GET") {
    if (!date || typeof date !== "string") {
      return res.status(400).json({ message: "Invalid or missing date" });
    }

    try {
      const targetDate = new Date(date);

      if (isNaN(targetDate.getTime())) {
        return res.status(400).json({ message: "Invalid date format" });
      }

      // Assuming you want to filter games starting from the given date up to 7 days ahead
      const endDate = addDays(targetDate, 7);

      const filteredGames = games.filter((game) => {
        const gameDate = new Date(game.official_date);
        console.log(gameDate);
        // Check if the game date is on or after the target date and before or on the end date
        return gameDate >= targetDate && gameDate <= endDate;
      });
      res.status(200).json(filteredGames);
    } catch (error) {
      if (error instanceof Error) {
        //try...catch block makes error type unknown. check if the caught object is an instance of Error to access props safely
        return res
          .status(500)
          .json({ message: "Server error", error: error.message });
      }
    }
  } else if (req.method === "PUT") {
    const {
      query: { id },
    } = req;
    if (!id) {
      res.status(400).json({ message: "Game ID is required" });
      return;
    }
    const gameId = parseInt(Array.isArray(id) ? id[0] : id, 10);
    const updatedGame: Game = req.body;
    const filePath = path.join(process.cwd(), "BaseballGames.json");
    let games: Game[] = JSON.parse(fs.readFileSync(filePath, "utf8"));

    games = games.map((game) =>
      game.id === gameId ? { ...game, ...updatedGame, id: gameId } : game
    );

    fs.writeFileSync(filePath, JSON.stringify(games));

    res.status(200).json({ message: "Game updated" });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
