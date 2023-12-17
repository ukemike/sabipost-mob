import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseUrl";

export const quoteApi = createApi({
  reducerPath: "quoteApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["QUOTE"],
  endpoints: (builder) => ({
    submitQuote: builder.mutation({
      query: ({ body, postID, token }) => ({
        url: `api/quote/store/${postID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      }),
      invalidatesTags: ["QUOTE"],
    }),

    negotiateQuote: builder.mutation({
      query: ({ body, quoteID, token }) => ({
        url: `api/quote/negotiation/store/${quoteID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      }),
      invalidatesTags: ["QUOTE"],
    }),

    acceptQuote: builder.mutation({
      query: ({ quoteID, token }) => ({
        url: `api/quote/accept/${quoteID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["QUOTE"],
    }),

    rejectQuote: builder.mutation({
      query: ({ quoteID, token }) => ({
        url: `api/quote/reject/${quoteID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["QUOTE"],
    }),

    getQuotesByPost: builder.query({
      query: ({ postID, token }) => ({
        url: `api/quote/by-post/${postID}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["QUOTE"],
    }),

    getNegotiationsForPost: builder.query({
      query: ({ postID, token }) => ({
        url: `api/quote/negotiation/all/${postID}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["QUOTE"],
    }),

    acceptCounterNegotiation: builder.mutation({
      query: ({ negotiationID, token }) => ({
        url: `api/quote/negotiation/accept-counter/${negotiationID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["QUOTE"],
    }),

    rejectCounterNegotiation: builder.mutation({
      query: ({ negotiationID, token }) => ({
        url: `api/quote/negotiation/reject-counter/${negotiationID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["QUOTE"],
    }),

    getQuoteByID: builder.query({
      query: ({ quoteID, token }) => ({
        url: `api/quote/show/${quoteID}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["QUOTE"],
    }),

    payForQuote: builder.mutation({
      query: ({ body, quoteID, token }) => ({
        url: `api/payment/pay-for-quote/${quoteID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      }),
      invalidatesTags: ["QUOTE"],
    }),

    getNegotiationsForPostVendor: builder.query({
      query: ({ postID, token }) => ({
        url: `api/quote/get-seller-quote/${postID}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["QUOTE"],
    }),

    getAllQuotesSeller: builder.query({
      query: (token) => ({
        url: `api/quote/seller`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["QUOTE"],
    }),

    counterNegotiationSeller: builder.mutation({
      query: ({ body, negotiationID, token }) => ({
        url: `api/quote/negotiation/counter/${negotiationID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      }),
      invalidatesTags: ["QUOTE"],
    }),

    acceptCounterNegotiationSeller: builder.mutation({
      query: ({ negotiationID, token }) => ({
        url: `api/quote/negotiation/accept/${negotiationID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["QUOTE"],
    }),

    rejectCounterNegotiationSeller: builder.mutation({
      query: ({ negotiationID, token }) => ({
        url: `api/quote/negotiation/reject/${negotiationID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
