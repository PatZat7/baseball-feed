import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchGames, deleteGame } from "../redux/gameSlice"; // Adjust these imports
import type { AppDispatch, RootState } from "../redux/store";
import { useAppDispatch } from "@/redux/hooks";
import { Game } from "../types/game"; // Adjust this import
import {
  styled,
  Button,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Stack,
  Paper,
  Link as MUILink,
} from "@mui/material";
import { ModeOutlined, ClearOutlined, AddOutlined } from "@mui/icons-material";
import { useRouter } from "next/router";

const Item = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: "center",
  color: "#fff",
}));

const HomePage: React.FC = () => {
  const router = useRouter();
  const [games, setGames] = useState<Game[]>([]);
  const dispatch = useAppDispatch();
  const gameData = useSelector((state: RootState) => state.games.games); // Adjust to your game slice
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  useEffect(() => {
    dispatch(fetchGames(formattedDate));
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      dispatch(fetchGames(formattedDate));
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    // Clean up the event listener when the component is unmounted
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.asPath]);

  useEffect(() => {
    if (gameData) {
      setGames(gameData);
    }
  }, [gameData]);

  const handleDelete = async (gameId: number) => {
    await dispatch(deleteGame(gameId));
    setGames(games.filter((g) => g.id !== gameId));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Broadcast and stats feed
          </Typography>
          <Button color="inherit">version no.1</Button>
        </Toolbar>
      </AppBar>

      <Typography
        color="secondary"
        sx={{ fontSize: "2.5rem", margin: "2rem auto" }}
        className="font-sans"
      >
        7-Day Game Schedule
      </Typography>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Stack
          spacing={2}
          sx={{
            border: "0.25px solid",
            borderColor: "secondary.main",
            padding: "3rem",
            borderRadius: "4px",
          }}
        >
          {games.map((game) => (
            <Item
              key={game.id}
              sx={{
                minWidth: "60vw",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <MUILink
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "70%",
                }}
                color="secondary"
                className="font-sans"
                href={`/schedule/${game.id}`}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ fontSize: "1.5rem", marginRight: "1rem" }}>
                    {game.id}
                  </Typography>
                  <Typography sx={{ fontSize: "1.5rem" }}>
                    {game.official_date}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography sx={{ fontSize: "1.5rem", marginRight: "1rem" }}>
                    {game.home_team.abbreviation} vs
                    {game.away_team.abbreviation}
                  </Typography>
                </Box>

                <Box>
                  <Typography sx={{ fontSize: "1.25rem" }}>
                    Venue: {game.venue}
                  </Typography>
                </Box>
              </MUILink>
              <Button variant="outlined" size="small">
                <MUILink href={`/schedule/gameById/${game.id}`}>
                  View Consumer Page
                </MUILink>
              </Button>
              <Button
                variant="contained"
                size="small"
                color="primary"
                onClick={() => handleDelete(game.id)}
              >
                <ClearOutlined sx={{ marginRight: "10px" }} />
                Delete Scheduled Game
              </Button>
            </Item>
          ))}
        </Stack>
      </Box>

      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Paper
          sx={{
            display: "flex",
            width: "80vw",
            margin: "1rem auto",
            padding: "1rem",
            justifyContent: "space-around",
          }}
        >
          <Button color="secondary" variant="outlined" size="large">
            <AddOutlined color="secondary" sx={{ marginRight: "10px" }} />
            <MUILink color="secondary" href="/add-game">
              Add New Game
            </MUILink>
          </Button>
          <Button color="secondary" variant="outlined" size="large">
            <ModeOutlined color="secondary" sx={{ marginRight: "10px" }} />
            <MUILink color="secondary" href="/update-policy">
              Edit Game
            </MUILink>
          </Button>
          <Button variant="outlined" size="large">
            <ClearOutlined color="primary" sx={{ marginRight: "10px" }} />
            <MUILink href="/delete-policy">delete Game</MUILink>
          </Button>
        </Paper>
      </AppBar>
    </Box>
  );
};

export default HomePage;
