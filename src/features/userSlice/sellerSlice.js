import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";

export const getSellerRequest = createAsyncThunk(
  "seller/getSellerRequest",
  async ({ parPage, page, search }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/seller/get-seller-req?page=${page}&&search=${search}&&parPage=${parPage}`,
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

export const getSellerDetail = createAsyncThunk(
  "seller/getSellerDetail",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/seller/get-seller-detail/${sellerId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateSellerStatus = createAsyncThunk(
  "seller/updateSellerStatus",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(`/seller/update-seller-status`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getActiveSellers = createAsyncThunk(
  "seller/getActiveSellers",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/seller/get-active-seller?page=${page}&&search=${searchValue}&&parPage=${parPage}`,
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
export const getDeactiveSellers = createAsyncThunk(
  "seller/getDeactiveSellers",
  async (
    { parPage, page, searchValue },
    { rejectWithValue, fulfillWithValue }
  ) => {
    try {
      const { data } = await api.get(
        `/seller/get-deactive-seller?page=${page}&&search=${searchValue}&&parPage=${parPage}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const createStripeConnect = createAsyncThunk(
  "payment/createStripeConnect",
  async () => {
    try {
      const {
        data: { url },
      } = await api.get(`/payment/create-seller-stripe-account`, {
        withCredentials: true,
      });

      window.location.href = url;
    } catch (error) {
      console.log(error);
    }
  }
);

export const activatePaymentAccount = createAsyncThunk(
  "payment/activatePaymentAccount",
  async (activeCode, { rejectWithValue, fulfillWithValue }) => {
    try {
      const {
        data: { data },
      } = await api.patch(
        `/payment/activate-seller-stripe-account/${activeCode}`,
        {},
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const sellerSlice = createSlice({
  name: "seller",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    totalSellers: 0,
    totalDeactives: 0,
    deactiveSellers: [],
    sellers: [],
    seller: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSellerRequest.fulfilled, (state, { payload }) => {
        state.totalSellers = payload.totalSellers;
        state.sellers = payload.sellers;
      })
      .addCase(getSellerDetail.fulfilled, (state, { payload }) => {
        state.seller = payload.seller;
      })
      .addCase(updateSellerStatus.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(updateSellerStatus.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.seller = payload.seller;
        toast.success(payload.message);
      })
      .addCase(updateSellerStatus.rejected, (state, { payload }) => {
        state.loader = false;
        toast.error(payload.message);
      })
      .addCase(getActiveSellers.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.sellers = payload.sellers;
        state.totalSellers = payload.totalSellers;
      })
      .addCase(getDeactiveSellers.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.deactiveSellers = payload.deactiveSellers;
        state.totalDeactives = payload.totalDeactives;
      })

      .addCase(createStripeConnect.pending, (state, { payload }) => {
        state.loader = true;
        toast.success("Redirecting to Stripe Dashboard");
      })
      .addCase(createStripeConnect.fulfilled, (state, { payload }) => {
        state.loader = false;
      })
      .addCase(createStripeConnect.rejected, (state, { payload }) => {
        state.loader = false;
      })

      .addCase(activatePaymentAccount.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(activatePaymentAccount.fulfilled, (state, { payload }) => {
        state.loader = false;
        // toast.success(payload.message);
        state.successMessage = "success";
      })
      .addCase(activatePaymentAccount.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = "error";
      });
  },
});

export default sellerSlice.reducer;
