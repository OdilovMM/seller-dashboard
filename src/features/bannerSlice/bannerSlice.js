import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";

export const addBannerToHomePage = createAsyncThunk(
  "banner/addBannerToHomePage",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    console.log(info);
    try {
      const { data } = await api.post(`/products/add-banner`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getBanner = createAsyncThunk(
  "banner/getBanner",
  async (productId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/products/get-banner/${productId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateBanner = createAsyncThunk(
  "banner/updateBanner",
  async ({ bannerId, info }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.patch(
        `/products/update-banner/${bannerId}`,
        info,
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

export const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    banners: [],
    banner: 0,
  },
  reducers: {
    messageClear: (state, _) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addBannerToHomePage.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(addBannerToHomePage.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.banner = payload.banner;
        toast.success(payload.message);
      })
      .addCase(addBannerToHomePage.rejected, (state, { payload }) => {
        state.loader = false;
        toast.error(payload.error);
      })
      .addCase(getBanner.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(getBanner.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.banner = payload.getBanner;
      })
      .addCase(getBanner.rejected, (state, { payload }) => {
        state.loader = false;
      })
      // updateBanner
      .addCase(updateBanner.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(updateBanner.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.banner = payload.banner;
        toast.success(payload.message);
        state.successMessage = payload.message;
      })
      .addCase(updateBanner.rejected, (state, { payload }) => {
        state.loader = false;
        toast.error(payload.error);
        state.errorMessage = payload.error;
      });
  },
});
export const { messageClear } = bannerSlice.actions;
export default bannerSlice.reducer;
