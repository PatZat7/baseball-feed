import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../redux/store";
import { fetchGames } from "../redux/gameSlice"; // Adjust these imports
import { Game } from "@/types/game";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
    // const currentDate = new Date();
    // const year = currentDate.getFullYear();
    // const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    // const day = String(currentDate.getDate()).padStart(2, "0");

    // const formattedDate = `${year}-${month}-${day}`;
    // storeRef.current.dispatch(fetchGames(formattedDate));
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
