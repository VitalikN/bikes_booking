import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { bikesBookingApi } from "./bikesBookingApi/bikesBookingApi";

const store = configureStore({
  reducer: {
    [bikesBookingApi.reducerPath]: bikesBookingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(bikesBookingApi.middleware),
});

export const persistor = persistStore(store);

export default store;
