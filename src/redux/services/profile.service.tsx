import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseUrl";

export const profileApi = createApi({
  reducerPath: "profileApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["PROFILE"],
  endpoints: (builder) => ({
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

export const { useUpdateProfileMutation } = profileApi;
