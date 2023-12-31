import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userBikesBookingApi = createApi({
  reducerPath: "userBikesBookingApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://bikesbooking-backend.onrender.com/api/bikes",

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
    updateBikeStatus: builder.mutation({
      query: ({ bikeId, newType }) => ({
        url: `/${bikeId}`,
        method: "PATCH",
        body: { type: newType },
      }),
      invalidatesTags: ["userBikesBooking"],
    }),
    addBike: builder.mutation({
      query: (formData) => ({
        url: `/`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["userBikesBooking"],
    }),
    deleteBike: builder.mutation({
      query: (_id) => ({
        url: `/${_id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["userBikesBooking"],
    }),
  }),
});

export const {
  useUpdateBikeStatusMutation,
  useAddBikeMutation,
  useDeleteBikeMutation,
} = userBikesBookingApi;
