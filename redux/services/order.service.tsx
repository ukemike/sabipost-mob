import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseUrl";
import { store } from "../store";

export const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["ORDER"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: `api/order/buyer-orders`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      providesTags: ["ORDER"],
    }),

    getOrder: builder.query({
      query: (orderID) => ({
        url: `api/order/single-order/${orderID}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      providesTags: ["ORDER"],
    }),

    getOrderVendor: builder.query({
      query: () => ({
        url: `api/order/seller-orders`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      providesTags: ["ORDER"],
    }),

    initiateDelivery: builder.mutation({
      query: (orderID) => ({
        url: `api/order/initiate-delivery/${orderID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      invalidatesTags: ["ORDER"],
    }),

    confirmDelivery: builder.mutation({
      query: ({ body, orderID }) => ({
        url: `api/order/confirm-delivery/${orderID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
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
