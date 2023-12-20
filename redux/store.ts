import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./gameSlice";
import { useMemo } from "react";

let store: ReturnType<typeof makeStore> | null = null;

export const makeStore = (preloadedState = {}) =>
  configureStore({
    reducer: {
      games: gamesReducer,
    },
    preloadedState,
  });

export const initializeStore = (preloadedState = {}) => {
  // For server-side rendering, always create a new store with the preloaded state
  if (typeof window === "undefined") {
    return makeStore(preloadedState);
  }
  // For the client-side, create the store once
  if (!store) {
    store = makeStore(preloadedState);
  }

  return store;
};

export const useStore = (initialState: RootState) => {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
};

const tempStore = makeStore(); // store could be created as undefined this is used to satisfy typescript until store is initialized

export type RootState = ReturnType<typeof tempStore.getState>;
export type AppDispatch = typeof tempStore.dispatch;
export default store;
