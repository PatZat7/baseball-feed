import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Game } from "../../../types/game"; // Assuming you have this Game interface defined in the types
import ReactHlsPlayer from "@ducanh2912/react-hls-player";

const GameDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    if (typeof id === "string") {
      fetch(`/api/schedule/gameById/${id}`)
        .then((res) => res.json())
        .then(setGame);
    }
  }, [id]);

  if (!game) return <p>Loading...</p>;

  return (
    <div>
      <h2>Game Detail</h2>
      <p>Date and Time: {game.date_time}</p>
      <p>Official Date: {game.official_date}</p>
      <p>Venue: {game.venue}</p>
      <p>Status: {game.status}</p>

      <h3>Home Team</h3>
      <p>Name: {game.home_team.name}</p>
      <p>Abbreviation: {game.home_team.abbreviation}</p>

      <h3>Away Team</h3>
      <p>Name: {game.away_team.name}</p>
      <p>Abbreviation: {game.away_team.abbreviation}</p>

      <h3>Score</h3>
      <p>Inning: {game.score.inning}</p>
      <p>Inning Half: {game.score.inning_half}</p>
      <p>Home Score: {game.score.home_score}</p>
      <p>Away Score: {game.score.away_score}</p>

      {game.channel && (
        <div>
          <h3>Channel</h3>
          <p>Name: {game.channel.name}</p>
          <p>URL: {game.channel.public_cdn_url}</p>
        </div>
      )}

      {game.no_broadcast && <p>No Broadcast</p>}
      <ReactHlsPlayer
        src="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
        autoPlay={true}
        controls={true}
        width="100%"
        height="auto"
      />
    </div>
  );
};

export default GameDetailPage;
