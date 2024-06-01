import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";

export const addProduct = createAsyncThunk(
  "product/addCategory",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/products/add-product", product, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getProducts = createAsyncThunk(
  "product/getProduct",
  async ({ parPage, page, search }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/products/get-products?page=${page}&&search=${search}&&parPage=${parPage}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// get a single product based on the provided id using searchParams()

export const getA_Product = createAsyncThunk(
  "product/getA_Product",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/products/get-product/${productId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async (product, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.patch(`/products/update-product`, product, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const productImageUpdate = createAsyncThunk(
  "product/updateProductImage",
  async (
    { oldImage, newImage, productId },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const formData = new FormData();

      formData.append("oldImage", oldImage);
      formData.append("newImage", newImage);
      formData.append("productId", productId);

      const { data } = await api.patch(
        `/products/update-product-image`,
        formData,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const productSlice = createSlice({
  name: "product",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    imageLoader: false,
    products: [],
    product: "",
    totalProducts: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addProduct.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(addProduct.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        toast.success(payload.message);
      
      })
      .addCase(addProduct.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
        toast.error(payload.error);
        state.products = [...state.products, payload.category];
      })
      .addCase(getProducts.fulfilled, (state, { payload }) => {
        state.totalProducts = payload.totalProducts;
        state.products = payload.products;
      })
      .addCase(getA_Product.fulfilled, (state, { payload }) => {
        state.product = payload.product;
      })
      .addCase(updateProduct.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.successMessage = payload.message;
        state.product = payload.product;
        toast.success(payload.message);
       
      })
      .addCase(updateProduct.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
        toast.error(payload.error);
        state.products = [...state.products, payload.category];
      })
      .addCase(productImageUpdate.pending, (state, { payload }) => {
        state.loader = false;
        state.imageLoader = true
      })
      .addCase(productImageUpdate.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.imageLoader = false
        state.successMessage = payload.message;
        state.product = payload.product;
        toast.success(payload.message);
      
      });
  },
});

export default productSlice.reducer;
