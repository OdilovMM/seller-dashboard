import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";



export const getSellerDashboardInfo = createAsyncThunk(
  "dashboard/getSellerDashboardInfo",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/dashboard/get-seller-dashboard-info", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    loader: false,
    successMessage: "",
    errorMessage: "",
    totalSales: 0,
    totalOrders: 0,
    totalProduct: 0,
    totalProducts: 0,
    recentOrders: [],
    totalPendingOrder: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder      
      .addCase(getSellerDashboardInfo.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(getSellerDashboardInfo.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.totalSales = payload.totalSales;
        state.totalProducts = payload.totalProducts;
        state.totalOrders = payload.totalOrders;
        state.recentOrders = payload.recentOrders;
        state.totalPendingOrder = payload.totalPendingOrder;
      })
      .addCase(getSellerDashboardInfo.rejected, (state, { payload }) => {
        state.loader = false;
      });
  },
});

export default dashboardSlice.reducer;
