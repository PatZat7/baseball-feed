import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Game, Channel } from "../types/game"; // Assuming you have this Game interface defined in the types
import { useSelector, useDispatch } from "react-redux";
import { selectGameById } from "../redux/scheduleSelectors";
import { RootState } from "../redux/store";
import { Button, Box, Typography, Paper, TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { updateGame } from "../redux/gameSlice";
import type { AppDispatch } from "../redux/store";
interface ScheduleProps {
  onSubmit: (data: Game) => void;
}

const Schedule: React.FC<ScheduleProps> = ({ onSubmit }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { id } = router.query;
  const gameId = Array.isArray(id)
    ? parseInt(id[0], 10)
    : parseInt(id as string, 10);
  const games = useSelector((state: RootState) => state.games.games);

  const [selectedDate, setSelectedDate] = React.useState<Dayjs | null>(null);
  const [formData, setFormData] = useState<Game>({
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
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddChannel = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Convert value to a number, and use a default value (e.g., 0) if conversion fails
    const numericValue = parseInt(value, 10) || 0;
    if (numericValue) {
      setFormData({
        ...formData,
        channel: {
          ...formData.channel,
          [name]: name === "id" ? numericValue : value, // Only convert 'id' to a number
        },
      });
    }
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      status: (event.target as HTMLInputElement).value,
    });
  };

  const handleDateChange = (newDate: Dayjs | null) => {
    if (newDate) {
      setFormData({
        ...formData,
        official_date: newDate.format("YYYY-MM-DD"),
      });
    }
  };
  const handleDateTimeChange = (newDateTime: Dayjs | null) => {
    if (newDateTime) {
      setFormData({
        ...formData,
        date_time: newDateTime.format("YYYY-MM-DDTHH:mm:ss"),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);

    router.push("/");
  };

  //show latest info on edit form
  useEffect(() => {
    const selectGame = games.find((game) => game.id === gameId);
    if (selectGame) {
      setFormData(selectGame);
    }
  }, [gameId]);

  useEffect(() => {
    if (selectedDate) {
      setFormData({
        ...formData,
        official_date: selectedDate.format("YYYY-MM-DD"),
      });
    }
  }, [selectedDate]);

  return (
    <div>
      <Typography
        color="secondary"
        sx={{ fontSize: "2rem", margin: "2rem auto" }}
      >
        Editing {formData.home_team.name} vs {formData.away_team.name}
      </Typography>

      <form onSubmit={handleSubmit}>
        <Paper
          sx={{
            maxWidth: "400px",
            padding: "1rem",
          }}
        >
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "baseline",
              justifyContent: "space-between",
              margin: "1rem 0",
            }}
          >
            <Typography>
              <label htmlFor="id">Date Time</label>
            </Typography>
            <DateTimePicker
              value={dayjs(formData.date_time)}
              onChange={handleDateTimeChange}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "baseline",
              justifyContent: "space-between",
              margin: "1rem 0",
            }}
          >
            <Typography>
              <label htmlFor="id">Official Date</label>
            </Typography>
            <DatePicker
              value={dayjs(formData.official_date)}
              onChange={handleDateChange}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "baseline",
              justifyContent: "space-between",
              margin: "1rem 0",
            }}
          >
            <Typography>
              <label htmlFor="policyHolderName">Status:</label>
            </Typography>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
              value={formData.status}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="Pre-Game"
                control={<Radio />}
                label="Pre-Game"
              />
              <FormControlLabel
                value="In-Progress"
                control={<Radio />}
                label="In-Progress"
              />
              <FormControlLabel
                value="Final"
                control={<Radio />}
                label="Final"
              />
            </RadioGroup>
          </Box>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "baseline",
              justifyContent: "space-between",
              margin: "1rem 0",
            }}
          >
            <Typography>
              <label htmlFor="coverage">Venue:</label>
            </Typography>
            <TextField
              label={
                formData.venue !== ""
                  ? formData.venue
                  : "Please set a Venue for this event"
              }
              variant="standard"
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
            />
          </Box>

          <hr />
          <Typography
            color="secondary"
            sx={{ fontSize: "1.5rem", margin: "2rem auto" }}
          >
            Add channel
          </Typography>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "baseline",
              justifyContent: "space-between",
              margin: "1rem 0",
            }}
          >
            <Typography>
              <label htmlFor="coverage">channel_id: </label>
            </Typography>
            <TextField
              label={"Please set a channel ID"}
              variant="standard"
              type="text"
              name="id"
              value={formData.channel?.id}
              onChange={handleAddChannel}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "baseline",
              justifyContent: "space-between",
              margin: "1rem 0",
            }}
          >
            <Typography>
              <label htmlFor="coverage">channel name: </label>
            </Typography>
            <TextField
              label={"Please set a channel Name"}
              variant="standard"
              type="text"
              name="name"
              value={formData.channel?.name}
              onChange={handleAddChannel}
            />
          </Box>

          <Box
            sx={{
              width: "100%",
              alignItems: "baseline",
              justifyContent: "space-between",
              margin: "1rem 0",
              paddingBottom: "1rem",
            }}
          >
            <Typography
              sx={{
                marginBottom: "1rem",
              }}
            >
              <label htmlFor="coverage">cdn url: </label>
            </Typography>
            <TextField
              sx={{
                width: "100%",
              }}
              label={"Please set a cdn"}
              variant="standard"
              type="text"
              name="public_cdn_url"
              value={formData.channel?.public_cdn_url}
              onChange={handleAddChannel}
            />
          </Box>

          <hr />

          <Box
            sx={{
              display: "flex",
              width: "100%",
              alignItems: "baseline",
              justifyContent: "space-between",
              margin: "1rem 0",
            }}
          >
            <Typography>
              <label htmlFor="policyHolderName">set no broadcast</label>
            </Typography>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="no_broadcast"
              value={formData.no_broadcast}
              onChange={handleChange}
            >
              <FormControlLabel value={true} control={<Radio />} label="Yes" />
              <FormControlLabel value={false} control={<Radio />} label="No" />
            </RadioGroup>
          </Box>
        </Paper>

        <Button
          color="secondary"
          variant="contained"
          size="large"
          type="submit"
          sx={{ margin: "1rem 0" }}
        >
          Update Game
        </Button>
      </form>
    </div>
  );
};

export default Schedule;
