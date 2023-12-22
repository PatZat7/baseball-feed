import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Game } from "../../../types/game";
import { useSelector, useDispatch } from "react-redux";
import { selectGameById } from "../redux/scheduleSelectors";
import { RootState } from "../redux/store";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { updateGame, fetchGames } from "../redux/gameSlice";
import type { AppDispatch } from "../redux/store";
import ReactHlsPlayer from "@ducanh2912/react-hls-player";
import { Suspense } from "react";
import {
  styled,
  Button,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Paper,
  TextField,
  Link as MUILink,
} from "@mui/material";

const GameDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [game, setGame] = useState<Game | null>(null);

  // useEffect(() => {
  //   if (typeof id === "string") {
  //     fetch(`/api/schedule/gameById/${id}`)
  //       .then((res) => res.json())
  //       .then(setGame);
  //   }
  // }, [id]);

  useEffect(() => {
    if (typeof id === "string") {
      const source = new EventSource(`/api/schedule/gameById/${id}`);

      source.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        setGame(data); // Handle the streamed data
      };

      source.onerror = () => {
        source.close();
        console.error("Stream encountered an error");
      };

      return () => {
        source.close();
      };
    }
  }, [id]);

  if (!game) return <p>Loading...</p>;

  return (
    <div>
      <Suspense fallback={<p>Loading feed...</p>}>
        {game.no_broadcast && <p>No Broadcast</p>}
        <ReactHlsPlayer
          src={game.channel.public_cdn_url}
          autoPlay={true}
          controls={true}
          width="100%"
          height="auto"
        />
        <AppBar
          position="fixed"
          color="primary"
          sx={{ top: "auto", bottom: 0, padding: "0.25rem" }}
        >
          <Typography
            component="div"
            sx={{
              flexGrow: 1,
              padding: "0.25rem",
              margin: "0 auto",
              fontSize: "1.5rem",
            }}
          >
            {game.home_team.name} VS {game.away_team.name} at {game.venue}
          </Typography>
          <Paper
            sx={{
              display: "flex",
              width: "90vw",
              margin: "1rem auto",
              padding: "1rem",
              justifyContent: "space-around",
            }}
          >
            <Typography
              component="div"
              sx={{
                flexGrow: 1,
                padding: "0.25rem",

                fontSize: "1.25rem",
                width: "20%",
              }}
            >
              {game.channel.name}
            </Typography>

            <Typography
              component="div"
              sx={{
                flexGrow: 1,
                padding: "0.25rem",

                fontSize: "1.25rem",
                width: "20%",
              }}
            >
              {game.status}
            </Typography>

            <Typography
              component="div"
              sx={{
                flexGrow: 1,
                padding: "0.25rem",

                fontSize: "1.25rem",
                width: "20%",
              }}
            >
              {game.home_team.abbreviation}: {game.score.home_score}
            </Typography>

            <Typography
              component="div"
              sx={{
                flexGrow: 1,
                padding: "0.25rem",

                fontSize: "1.25rem",
                width: "20%",
              }}
            >
              {game.away_team.abbreviation}: {game.score.away_score}
            </Typography>

            <Typography
              component="div"
              sx={{
                flexGrow: 1,
                padding: "0.25rem",

                fontSize: "1.25rem",
                width: "20%",
              }}
            >
              inning: {game.score.inning}
            </Typography>

            <Typography
              component="div"
              sx={{
                flexGrow: 1,
                padding: "0.25rem",

                fontSize: "1.25rem",
                width: "20%",
              }}
            >
              inning half: {game.score.inning_half}
            </Typography>
          </Paper>
        </AppBar>
      </Suspense>
    </div>
  );
};

export default GameDetailPage;
