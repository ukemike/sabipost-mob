import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseUrl";
import { store } from "../store";

export const quoteApi = createApi({
  reducerPath: "quoteApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["QUOTE"],
  endpoints: (builder) => ({
    submitQuote: builder.mutation({
      query: ({ body, postID }) => ({
        url: `api/quote/store/${postID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
        body: body,
      }),
      invalidatesTags: ["QUOTE"],
    }),

    negotiateQuote: builder.mutation({
      query: ({ body, quoteID }) => ({
        url: `api/quote/negotiation/store/${quoteID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
        body: body,
      }),
      invalidatesTags: ["QUOTE"],
    }),

    acceptQuote: builder.mutation({
      query: (quoteID) => ({
        url: `api/quote/accept/${quoteID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      invalidatesTags: ["QUOTE"],
    }),

    rejectQuote: builder.mutation({
      query: (quoteID) => ({
        url: `api/quote/reject/${quoteID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      invalidatesTags: ["QUOTE"],
    }),

    getQuotesByPost: builder.query({
      query: (postID) => ({
        url: `api/quote/by-post/${postID}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      providesTags: ["QUOTE"],
    }),

    getNegotiationsForPost: builder.query({
      query: (postID) => ({
        url: `api/quote/negotiation/all/${postID}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      providesTags: ["QUOTE"],
    }),

    acceptCounterNegotiation: builder.mutation({
      query: (negotiationID) => ({
        url: `api/quote/negotiation/accept-counter/${negotiationID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      invalidatesTags: ["QUOTE"],
    }),

    rejectCounterNegotiation: builder.mutation({
      query: (negotiationID) => ({
        url: `api/quote/negotiation/reject-counter/${negotiationID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      invalidatesTags: ["QUOTE"],
    }),

    getQuoteByID: builder.query({
      query: (quoteID) => ({
        url: `api/quote/show/${quoteID}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      providesTags: ["QUOTE"],
    }),

    payForQuote: builder.mutation({
      query: ({ body, quoteID }) => ({
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
      invalidatesTags: ["QUOTE"],
    }),

    getNegotiationsForPostVendor: builder.query({
      query: (postID) => ({
        url: `api/quote/get-seller-quote/${postID}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      providesTags: ["QUOTE"],
    }),

    getAllQuotesSeller: builder.query({
      query: () => ({
        url: `api/quote/seller`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      providesTags: ["QUOTE"],
    }),

    counterNegotiationSeller: builder.mutation({
      query: ({ body, negotiationID }) => ({
        url: `api/quote/negotiation/counter/${negotiationID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
        body: body,
      }),
      invalidatesTags: ["QUOTE"],
    }),

    acceptCounterNegotiationSeller: builder.mutation({
      query: (negotiationID) => ({
        url: `api/quote/negotiation/accept/${negotiationID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      invalidatesTags: ["QUOTE"],
    }),

    rejectCounterNegotiationSeller: builder.mutation({
      query: (negotiationID) => ({
        url: `api/quote/negotiation/reject/${negotiationID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      invalidatesTags: ["QUOTE"],
    }),
    
  }),
});

export const {
  useSubmitQuoteMutation,
  useNegotiateQuoteMutation,
  useAcceptQuoteMutation,
  useRejectQuoteMutation,
  useGetQuotesByPostQuery,
  useGetNegotiationsForPostQuery,
  useAcceptCounterNegotiationMutation,
  useRejectCounterNegotiationMutation,
  useGetQuoteByIDQuery,
  usePayForQuoteMutation,
  useGetNegotiationsForPostVendorQuery,
  useGetAllQuotesSellerQuery,
  useCounterNegotiationSellerMutation,
  useAcceptCounterNegotiationSellerMutation,
  useRejectCounterNegotiationSellerMutation,
} = quoteApi;
