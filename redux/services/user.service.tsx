import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseUrl";
import { store } from "../store";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["USER"],
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => ({
        url: `api/account/user/index`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
      }),
      providesTags: ["USER"],
    }),

    updateProfile: builder.mutation({
      query: (body) => ({
        url: `api/account/user/update`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
        body: body,
      }),
      invalidatesTags: ["USER"],
    }),

    updateProfilePicture: builder.mutation({
      query: (body) => ({
        url: `api/account/user/update-picture`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
        body: body,
      }),
      invalidatesTags: ["USER"],
    }),

    updatePassword: builder.mutation({
      query: (body) => ({
        url: `api/account/user/update-password`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
        body: body,
      }),
      invalidatesTags: ["USER"],
    }),

    updateBank: builder.mutation({
      query: (body) => ({
        url: `api/account/user/update-bank`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
        body: body,
      }),
      invalidatesTags: ["USER"],
    }),

    updateCategory: builder.mutation({
      query: (body) => ({
        url: `api/account/user/update-category`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
        body: body,
      }),
      invalidatesTags: ["USER"],
    }),

    updateBusiness: builder.mutation({
      query: (body) => ({
        url: `api/account/user/update-business`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
        body: body,
      }),
      invalidatesTags: ["USER"],
    }),

    verifyBusiness: builder.mutation({
      query: (body) => ({
        url: `api/account/user/verify-business`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
        body: body,
      }),
      invalidatesTags: ["USER"],
    }),

    uploadBanner: builder.mutation({
      query: (body) => ({
        url: `api/account/user/update-banner`,
        method: "POST",
        headers: {
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
        body: body,
      }),
      invalidatesTags: ["USER"],
    }),
  }),
});

export const {
  useGetUserInfoQuery,
  useUpdateProfileMutation,
  useUpdateProfilePictureMutation,
  useUpdatePasswordMutation,
  useUpdateBankMutation,
  useUpdateCategoryMutation,
  useUpdateBusinessMutation,
  useVerifyBusinessMutation,
  useUploadBannerMutation,
} = userApi;
