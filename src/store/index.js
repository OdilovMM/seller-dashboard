import { configureStore } from "@reduxjs/toolkit";
import rootSlice from "./rootSlice";


const isDevelopment = window.location.hostname === "localhost";

const store = configureStore({
  reducer: rootSlice,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
  devTools: isDevelopment,
});

export default store;
