import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bikesBookingApi = createApi({
  reducerPath: "bikesBookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bikesbooking-backend.onrender.com/api/bikes",
  }),
  tagTypes: ["bikesBooking"],
  endpoints: (builder) => ({
    getAllbikes: builder.query({
      query: ({ page, limit }) => `?page=${page}&limit=${limit}`,
    }),
  }),
});

export const { useGetAllbikesQuery } = bikesBookingApi;
