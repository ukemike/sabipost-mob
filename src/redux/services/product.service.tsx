import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "../baseUrl";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
  tagTypes: ["PRODUCT"],
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: ({ body, token }) => ({
        url: `api/product/store`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      }),
      invalidatesTags: ["PRODUCT"],
    }),
    getAllProduct: builder.query({
      query: (data) => ({
        url: `api/product/all?limit=${data?.limit}&page=${data?.page}&search=${data?.search}&category=${data?.category}&state=${data?.state}&priceRange=${data?.priceRange}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["PRODUCT"],
    }),

    getMyProducts: builder.query({
      query: ({ data, token }) => ({
        url: `api/product/index?limit=${data?.limit}&page=${data?.page}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["PRODUCT"],
    }),

    updateProduct: builder.mutation({
      query: ({ body, productID, token }) => ({
        url: `api/product/update/${productID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      }),
      invalidatesTags: ["PRODUCT"],
    }),

    categoriesProduct: builder.query({
      query: () => ({
        url: `api/product/categories`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["PRODUCT"],
    }),

    getProductsByCategory: builder.query({
      query: ({ categoryID, data }) => ({
        url: `api/product/by-category/${categoryID}?limit=${data?.limit}&page=${data?.page}&search=${data?.search}&category=${data?.category}&state=${data?.state}&priceRange=${data?.priceRange}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["PRODUCT"],
    }),

    negotiateProduct: builder.mutation({
      query: ({ body, productID, token }) => ({
        url: `api/product/negotiation/store/${productID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      }),
      invalidatesTags: ["PRODUCT"],
    }),

    getNegotiationByUser: builder.query({
      query: ({ data, token }) => ({
        url: `api/product/negotiation/by-user?limit=${data?.limit}&page=${data?.page}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["PRODUCT"],
    }),
    // /api/product/negotiation/show/99c3c810-035f-40ef-a48d-1ed31038fe88
    getNegotiationByProductBuyer: builder.query({
      query: ({ productID, token }) => ({
        url: `api/product/negotiation/for-product-buyer/${productID}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["PRODUCT"],
    }),

    getNegotiationByProductSeller: builder.query({
      query: ({ productID, token }) => ({
        url: `api/product/negotiation/for-product-seller/${productID}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["PRODUCT"],
    }),

    getNegotiationByID: builder.query({
      query: ({ negotiationID, token }) => ({
        url: `api/product/negotiation/show/${negotiationID}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["PRODUCT"],
    }),

    acceptNegotiation: builder.mutation({
      query: ({ negotiationID, token, body }) => ({
        url: `api/product/negotiation/accept/${negotiationID}`,
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["PRODUCT"],
    }),

    rejectNegotiation: builder.mutation({
      query: ({ negotiationID, token }) => ({
        url: `api/product/negotiation/reject/${negotiationID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["PRODUCT"],
    }),

    counterNegotiation: builder.mutation({
      query: ({ body, negotiationID, token }) => ({
        url: `api/product/negotiation/counter/${negotiationID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      }),
      invalidatesTags: ["PRODUCT"],
    }),

    acceptCounterNegotiation: builder.mutation({
      query: ({ negotiationID, token }) => ({
        url: `api/product/negotiation/accept-counter/${negotiationID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["PRODUCT"],
    }),

    rejectCounterNegotiation: builder.mutation({
      query: ({ negotiationID, token }) => ({
        url: `api/product/negotiation/reject-counter/${negotiationID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["PRODUCT"],
    }),

    getNegotiationForSeller: builder.query({
      query: ({ data, token }) => ({
        url: `api/product/negotiation/for-seller?limit=${data.limit}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["PRODUCT"],
    }),

    getSingleProduct: builder.query({
      query: (productID) => ({
        url: `api/product/single/${productID}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }),
      providesTags: ["PRODUCT"],
    }),

    getVendorProducts: builder.query({
      query: ({ vendorID, token }) => ({
        url: `api/product/by-user/${vendorID}`,
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: ["PRODUCT"],
    }),

    payForProduct: builder.mutation({
      query: ({ body, productID, token }) => ({
        url: `api/payment/pay-for-product/${productID}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: body,
      }),
      invalidatesTags: ["PRODUCT"],
    }),

    removeImage: builder.mutation({
      query: ({ imageID, token }) => ({
        url: `api/product/remove-image/${imageID}`,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
      invalidatesTags: ["PRODUCT"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductQuery,
  useGetMyProductsQuery,
  useUpdateProductMutation,
  useCategoriesProductQuery,
  useGetProductsByCategoryQuery,
  useNegotiateProductMutation,
  useGetNegotiationByUserQuery,
  useGetNegotiationByProductBuyerQuery,
  useGetNegotiationByProductSellerQuery,
  useGetNegotiationByIDQuery,
  useAcceptNegotiationMutation,
  useRejectNegotiationMutation,
  useCounterNegotiationMutation,
  useAcceptCounterNegotiationMutation,
  useRejectCounterNegotiationMutation,
  useGetNegotiationForSellerQuery,
  useGetSingleProductQuery,
  useGetVendorProductsQuery,
  usePayForProductMutation,
  useRemoveImageMutation,
} = productApi;
