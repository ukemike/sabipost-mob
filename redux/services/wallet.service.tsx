import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseUrl";
import { store } from "../store";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["WALLET"],
  endpoints: (builder) => ({
    getWalletBalance: builder.query({
      query: () => ({
        url: `api/account/wallet/index`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      providesTags: ["WALLET"],
    }),

    topUpWallet: builder.mutation({
      query: (body) => ({
        url: `api/account/wallet/top-up`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
        body: body,
      }),
      invalidatesTags: ["WALLET"],
    }),

    requestWithdrawal: builder.mutation({
      query: (body) => ({
        url: `api/account/wallet/request-withdrawal`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
        body: body,
      }),
      invalidatesTags: ["WALLET"],
    }),

    getWalletTransactions: builder.query({
      query: (data) => ({
        url: `api/account/wallet/transactions?limit=${data.limit}&page=${data.page}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      providesTags: ["WALLET"],
    }),

    getWalletTransaction: builder.query({
      query: (transactionID) => ({
        url: `api/account/wallet/transaction/${transactionID}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      providesTags: ["WALLET"],
    }),

    getWalletWithdrawals: builder.query({
      query: (data) => ({
        url: `api/account/wallet/withdrawals?limit=${data.limit}&page=${data.page}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      providesTags: ["WALLET"],
    }),

    getWalletWithdrawal: builder.query({
      query: (withdrawalID) => ({
        url: `api/account/wallet/withdrawal/${withdrawalID}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      providesTags: ["WALLET"],
    }),

    getWalletPendingWithdrawals: builder.query({
      query: () => ({
        url: `api/account/wallet/pending-withdrawals`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      providesTags: ["WALLET"],
    }),

    getWalletApprovedWithdrawals: builder.query({
      query: () => ({
        url: `api/account/wallet/approved-withdrawals`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      providesTags: ["WALLET"],
    }),

    getWalletRejectedWithdrawals: builder.query({
      query: () => ({
        url: `api/account/wallet/rejected-withdrawals`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      providesTags: ["WALLET"],
    }),
  }),
});

export const {
  useGetWalletBalanceQuery,
  useTopUpWalletMutation,
  useRequestWithdrawalMutation,
  useGetWalletTransactionsQuery,
  useGetWalletTransactionQuery,
  useGetWalletWithdrawalsQuery,
  useGetWalletWithdrawalQuery,
  useGetWalletPendingWithdrawalsQuery,
  useGetWalletApprovedWithdrawalsQuery,
  useGetWalletRejectedWithdrawalsQuery,
} = walletApi;
