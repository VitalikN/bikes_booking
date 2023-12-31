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
import persisteAuthReducer from "./authApi/authApiSlice";
import { userBikesBookingApi } from "./userBikesBookingApi/userBikesBookingApi";
import { authApi } from "./authApi/authAPI";

const store = configureStore({
  reducer: {
    auth: persisteAuthReducer,

    [authApi.reducerPath]: authApi.reducer,

    [bikesBookingApi.reducerPath]: bikesBookingApi.reducer,
    [userBikesBookingApi.reducerPath]: userBikesBookingApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      bikesBookingApi.middleware,
      bikesBookingApi.middleware,
      userBikesBookingApi.middleware
    ),
});

export const persistor = persistStore(store);

export default store;
