import type { NextApiRequest, NextApiResponse } from "next";
import games from "../../../../BaseballGames.json";
import type { Game } from "../../../../types/game";
import fs from "fs";
import path from "path";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Game | { message: string }>
) {
  const {
    query: { id },
  } = req;

  if (req.method === "GET") {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const game = games.find((g) => g.id === parseInt(id as string));

    if (game) {
      res.write(`data: ${JSON.stringify(game)}\n\n`);
      // Close the connection after sending the game data
      res.end();
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } else if (req.method === "DELETE") {
    if (!id) {
      res.status(400).json({ message: "Game ID is required" });
      return;
    }
    const gameId = parseInt(Array.isArray(id) ? id[0] : id, 10);
    // Path to your JSON file
    const filePath = path.join(process.cwd(), "BaseballGames.json");
    const fileData = fs.readFileSync(filePath);
    let games: Game[] = JSON.parse(fileData.toString());

    // Delete the game with the given id
    games = games.filter((game) => game.id !== gameId);

    // Write the updated games back to the file
    fs.writeFileSync(filePath, JSON.stringify(games));

    res.status(200).json({ message: "Game deleted" });
  } else if (req.method === "PUT") {
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
    res.status(405).end();
  }
}
