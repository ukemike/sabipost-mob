import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseUrl";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `user/login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    signUp: builder.mutation({
      query: (body) => ({
        url: `user/confirm-account-creation`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    preSignUp: builder.mutation({
      query: (body) => ({
        url: `user/presignup`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    confirmOtp: builder.mutation({
      query: (body) => ({
        url: `user/confirm-otp`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: `user/request-forgot`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    confirmForgotPassword: builder.mutation({
      query: (body) => ({
        url: `creative/confirm-forgot-password`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    socialAuth: builder.mutation({
      query: (body) => ({
        url: `social-signup-login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignUpMutation,
  usePreSignUpMutation,
  useConfirmOtpMutation,
  useForgotPasswordMutation,
  useConfirmForgotPasswordMutation,
  useSocialAuthMutation,
} = authApi;
