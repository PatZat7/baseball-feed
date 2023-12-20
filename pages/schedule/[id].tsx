import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Game } from "../../types/game"; // Assuming you have this Game interface defined in the types
import { useSelector } from "react-redux";
import Schedule from "../../components/Schedule";
//import { selectGameById, getGameById } from "../../redux/scheduleSelectors";
import { RootState } from "../../redux/store";

// export const getServerSideProps = async (context) => {
//     const reduxStore = initializeStore();
//     const { dispatch } = reduxStore;

//     await dispatch(fetchGames(/* parameters if any */));

//     return { props: { initialReduxState: reduxStore.getState() } };
//   };

const GameDetailPage: React.FC = () => {
  //if (!game) return <p>Loading...</p>;

  return (
    <div>
      {/* <h2>Game Detail</h2>
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
      <p>Away Score: {game.score.away_score}</p> */}

      <Schedule></Schedule>

      {/* {game.no_broadcast && <p>No Broadcast</p>} */}
    </div>
  );
};

export default GameDetailPage;
