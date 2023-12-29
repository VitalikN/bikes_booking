import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import store from "../store";

export const userBikesBookingApi = createApi({
  reducerPath: "userBikesBookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bikesbooking-backend.onrender.com/api/bikes",

    // baseUrl: "http://localhost:3001/api/bikes",

    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as { auth: { token: string } }).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["userBikesBooking"],
  endpoints: (builder) => ({
    updateBikeStatus: builder.mutation<
      any,
      { bikeId: string; newType: string }
    >({
      query: ({ bikeId, newType }) => ({
        url: `/${bikeId}`,
        method: "PATCH",
        body: { type: newType },
      }),
      invalidatesTags: ["userBikesBooking"],
    }),
  }),
});

export const { useUpdateBikeStatusMutation } = userBikesBookingApi;
