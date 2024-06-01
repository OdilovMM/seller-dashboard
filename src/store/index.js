import { configureStore } from "@reduxjs/toolkit";
import rootSlice from "./rootSlice";

const store = configureStore({
  reducer: rootSlice,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
  devTools: true,
});

export default store;
