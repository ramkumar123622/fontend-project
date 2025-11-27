import { mainApi } from "@/app/mainApi.js";

const productApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({

    // ============= GET Single Product ==================
    getProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),

    // ============= GET All Products =====================
    getProducts: builder.query({
      query: () => ({
        url: "/products",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),

    // ============= CREATE Product =======================
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        headers: {
          Authorization: data.token,
        },
        body: data.body,
      }),
      invalidatesTags: ["Products"],
    }),

    // ============= UPDATE Product =======================
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/products/${data.id}`,
        method: "PATCH",
        headers: {
          Authorization: data.token,
        },
        body: data.body,     
      }),
      invalidatesTags: ["Products"],  
    }),

    // ============= DELETE Product ========================
    removeProduct: builder.mutation({
      query: (data) => ({
        url: `/products/${data.id}`,
        method: "DELETE",
        headers: {
          Authorization: data.token,
        },
      }),
      invalidatesTags: ["Products"],
    }),

  })
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useRemoveProductMutation,
  useGetProductQuery,
  useUpdateProductMutation
} = productApi;
