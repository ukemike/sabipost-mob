import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseUrl";

export const generalApi = createApi({
  reducerPath: "generalApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["General"],
  endpoints: (builder) => ({
    getBanks: builder.query({
      query: () => ({
        url: `api/banks`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getStates: builder.query({
      query: () => ({
        url: `api/states/160`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getCategories: builder.query({
      query: () => ({
        url: `api/categories`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getLgas: builder.query({
      query: (stateID) => ({
        url: `api/lgas/${stateID}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetBanksQuery,
  useGetStatesQuery,
  useGetCategoriesQuery,
  useGetLgasQuery,
} = generalApi;
