import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseUrl";
import { store } from "../store";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["ORDER"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (token) => ({
        url: `api/order/buyer-orders`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["ORDER"],
    }),

    getOrder: builder.query({
      query: ({ orderID, token }) => ({
        url: `api/order/single-order/${orderID}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["ORDER"],
    }),

    getOrderVendor: builder.query({
      query: (token) => ({
        url: `api/order/seller-orders`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["ORDER"],
    }),

    initiateDelivery: builder.mutation({
      query: ({ orderID, token }) => ({
        url: `api/order/initiate-delivery/${orderID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["ORDER"],
    }),

    confirmDelivery: builder.mutation({
      query: ({ body, orderID, token }) => ({
        url: `api/order/confirm-delivery/${orderID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      }),
      invalidatesTags: ["ORDER"],
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useGetOrderVendorQuery,
  useInitiateDeliveryMutation,
  useConfirmDeliveryMutation,
} = orderApi;
