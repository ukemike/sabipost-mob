import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseUrl";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["PROFILE"],
  endpoints: (builder) => ({
    getMyProfile: builder.query({
      query: (token) => ({
        url: `profile`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["PROFILE"],
    }),

    updateProfile: builder.mutation({
      query: ({ token, data }) => ({
        url: `user/profile`,
        method: "PATCH",
        body: data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["PROFILE"],
    }),
  }),
});

export const { useGetMyProfileQuery, useUpdateProfileMutation } = profileApi;
