import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseUrl";
import { store } from "../store";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["PAYMENT"],
  endpoints: (builder) => ({
    payForQuote: builder.mutation({
      query: ({ quoteID, body }) => ({
        url: `api/payment/pay-for-quote/${quoteID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
        body: body,
      }),
      invalidatesTags: ["PAYMENT"],
    }),

    initiatePayForMe: builder.mutation({
      query: ({ orderID, body }) => ({
        url: `api/payment/initiate-pay-for-me/${orderID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
        body: body,
      }),
    }),

    verifyPayForMe: builder.mutation({
      query: ({ orderID, body }) => ({
        url: `api/payment/verify-pay-for-me/${orderID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
        body: body,
      }),
    }),
  }),
});

export const {
  usePayForQuoteMutation,
  useInitiatePayForMeMutation,
  useVerifyPayForMeMutation,
} = paymentApi;
