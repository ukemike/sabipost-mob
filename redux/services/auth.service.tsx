import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseUrl";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: `api/auth/register`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    login: builder.mutation({
      query: (body) => ({
        url: `api/auth/login`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    verifyEmail: builder.mutation({
      query: (body) => ({
        url: `api/auth/verify-email`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    resendCode: builder.mutation({
      query: (body) => ({
        url: `api/auth/resend-verify-code`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    requestResetPassword: builder.mutation({
      query: (body) => ({
        url: `api/auth/request-reset-password`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      }),
      invalidatesTags: ["Auth"],
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: `api/auth/reset-password`,
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
  useRegisterMutation,
  useLoginMutation,
  useVerifyEmailMutation,
  useResendCodeMutation,
  useRequestResetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
