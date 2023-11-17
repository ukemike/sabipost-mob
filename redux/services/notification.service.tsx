import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseUrl";
import { store } from "../store";

export const notificationApi = createApi({
  reducerPath: "notificationApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["NOTIFICATION"],
  endpoints: (builder) => ({
    getNotification: builder.query({
      query: () => ({
        url: `api/account/notification/index`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      providesTags: ["NOTIFICATION"],
    }),

    markAsRead: builder.mutation({
      query: (notificaionID) => ({
        url: `api/account/notification/mark-as-read/${notificaionID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      invalidatesTags: ["NOTIFICATION"],
    }),
  }),
});

export const { useGetNotificationQuery, useMarkAsReadMutation } =
  notificationApi;
