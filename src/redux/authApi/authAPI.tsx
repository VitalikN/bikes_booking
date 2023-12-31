import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { clearToken } from "./authApiSlice";
import store from "../store";

type RootState = ReturnType<typeof store.getState>;

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bikesbooking-backend.onrender.com/api/auth",

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as { auth: { token: string } }).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["auth"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: "/register",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout ",
        method: "POST",
      }),
      invalidatesTags: ["auth"],
    }),

    current: builder.query({
      query: () => "/current",

      onQueryStarted: (_, { dispatch, getState }) => {
        const token = (getState() as RootState).auth.token;
        if (!token) {
          dispatch(clearToken());
        }
      },
      providesTags: ["auth"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useCurrentQuery,
} = authApi;
