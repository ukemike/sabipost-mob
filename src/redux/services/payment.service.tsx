import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseUrl";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["PAYMENT"],
  endpoints: (builder) => ({
    payForQuote: builder.mutation({
      query: ({ quoteID, body, token }) => ({
        url: `api/payment/pay-for-quote/${quoteID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      }),
      invalidatesTags: ["PAYMENT"],
    }),

    initiatePayForMe: builder.mutation({
      query: ({ orderID, body, token }) => ({
        url: `api/payment/initiate-pay-for-me/${orderID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      }),
    }),

    verifyPayForMe: builder.mutation({
      query: ({ orderID, body, token }) => ({
        url: `api/payment/verify-pay-for-me/${orderID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
