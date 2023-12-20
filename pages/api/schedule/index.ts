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
    //Make channel option in ts interface and exclude it from the schedule endpoint
    //Directions specifially state what data to send over what endpoint. potential next step => only omit channel IF user role is admin
    const adminGames: Omit<Game, "channel">[] = games.map((game) => {
      const { channel, ...gameWithoutChannel } = game;
      return gameWithoutChannel;
    });

    if (!date || typeof date !== "string") {
      return res.status(400).json({ message: "Invalid or missing date" });
    }

    try {
      const targetDate = new Date(date);
      if (isNaN(targetDate.getTime())) {
        return res.status(400).json({ message: "Invalid date format" });
      }

      const startDate = addDays(targetDate, 0);
      const endDate = addDays(targetDate, 7);

      const filteredGames = adminGames.filter((game) => {
        const gameDate = new Date(game.official_date);
        return gameDate >= startDate && gameDate <= endDate;
      });

      return res.status(200).json(filteredGames);
    } catch (error) {
      if (error instanceof Error) {
        //try...catch block makes error type unknown. check if the caught object is an instance of Error to access props safely
        return res
          .status(500)
          .json({ message: "Server error", error: error.message });
      }
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse<Array<Game>>
// ) {
//   if (req.method === "POST") {
//     const newGame = req.body;

//     // Read the current games
//     const filePath = path.join(process.cwd(), "BaseballGames.json");
//     const fileData = fs.readFileSync(filePath);
//     const games: Game[] = JSON.parse(fileData.toString());

//     // Add the new game
//     // Add the new policy
//     games.push({ ...newGame, id: games.length + 1 }); // Generate a new ID
//     fs.writeFileSync(filePath, JSON.stringify(games));

//     res.status(201).json(newGame);
//   } else if (req.method === "GET") {
//     res.status(200).json(games);
//   } else {
//     res.status(405).end(); // Method Not Allowed
//   }
// }
