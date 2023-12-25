import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseUrl";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["NOTIFICATION"],
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: (token) => ({
        url: `api/account/notification/index`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["NOTIFICATION"],
    }),

    markAsRead: builder.mutation({
      query: ({ notificaionID, token }) => ({
        url: `api/account/notification/mark-as-read/${notificaionID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["NOTIFICATION"],
    }),
  }),
});

export const { useGetNotificationQuery, useMarkAsReadMutation } =
  notificationApi;
