import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseUrl";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["POST"],
  endpoints: (builder) => ({
    postProduct: builder.mutation({
      query: ({ body, token }) => ({
        url: `api/post/store`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      }),
      invalidatesTags: ["POST"],
    }),

    getAllPost: builder.query({
      query: (data) => ({
        url: `api/post/all?limit=${data?.limit}&page=${data?.page}&search=${data?.search}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["POST"],
    }),

    getMyPosts: builder.query({
      query: ({ data, token }) => ({
        url: `api/post/index?limit=${data?.limit}&page=${data?.page}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["POST"],
    }),

    getPostById: builder.query({
      query: (id) => ({
        url: `api/post/show/${id}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["POST"],
    }),

    getPostInSellerCategory: builder.query({
      query: ({ data, token }) => ({
        url: `api/post/interest?limit=${data?.limit}&page=${data?.page}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["POST"],
    }),

    categoriesPost: builder.query({
      query: () => ({
        url: `api/post/categories`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["POST"],
    }),

    useGetPostByCategory: builder.query({
      query: ({ categoryID, data }) => ({
        url: `api/post/by-category/${categoryID}?limit=${data?.limit}&page=${data?.page}&search=${data?.search}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["POST"],
    }),
  }),
});

export const {
  usePostProductMutation,
  useGetAllPostQuery,
  useGetMyPostsQuery,
  useGetPostByIdQuery,
  useGetPostInSellerCategoryQuery,
  useCategoriesPostQuery,
  useUseGetPostByCategoryQuery,
} = postApi;
