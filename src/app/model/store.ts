import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { appReducer, appSlice } from "./appSlice";

export const store = configureStore({
  reducer: {
    [appSlice.name]: appReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
