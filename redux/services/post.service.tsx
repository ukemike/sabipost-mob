import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseUrl";
import { store } from "../store";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["POST"],
  endpoints: (builder) => ({
    postProduct: builder.mutation({
      query: (body) => ({
        url: `api/post/store`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
        },
        body: body,
      }),
      invalidatesTags: ["POST"],
    }),
    
    getAllPost: builder.query({
      query: () => ({
        url: `api/post/all`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["POST"],
    }),

    getMyPosts: builder.query({
      query: (data) => ({
        url: `api/post/index?limit=${data?.limit}&page=${data?.page}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
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
      query: (data) => ({
        url: `api/post/interest?limit=${data?.limit}&page=${data?.page}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            store.getState()?.app?.auth?.userInfo?.token
          }`,
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
      query: ({categoryID, data}) => ({
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
