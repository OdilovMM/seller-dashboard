import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";

export const getSellerPaymentDetails = createAsyncThunk(
  "payment/getSellerPaymentDetails",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/payment/get-seller-payment-details/${sellerId}`,
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

export const sendWithdrawalRequest = createAsyncThunk(
  "payment/sendWithdrawalRequest",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        "/payment/send-withdrawal-request",
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


export const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    pendingWithdraws: [],
    successWithdraws: [],
    totalAmount: 0,
    withdrawAmount: 0,
    availableAmount: 0,
    pendingAmount: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSellerPaymentDetails.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(getSellerPaymentDetails.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.totalAmount = payload.data.totalAmount;
        state.withdrawAmount = payload.data.withdrawAmount;
        state.availableAmount = payload.data.availableAmount;
        state.pendingAmount = payload.data.pendingAmount;
        state.pendingWithdraws = payload.data.pendingWithdraws;
        state.successWithdraws = payload.data.successWithdraws;
      })
      .addCase(getSellerPaymentDetails.rejected, (state, { payload }) => {
        state.loader = false;
      })
      // sendWithdrawalRequest
      .addCase(sendWithdrawalRequest.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(sendWithdrawalRequest.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.pendingWithdraws = [
          ...state.pendingWithdraws,
          payload.data.withdrawal,
        ];
        state.availableAmount =
          state.availableAmount - payload.data.withdrawal.amount;
        state.pendingAmount = payload.data.withdrawal.amount;
        toast.success(payload.status);
      })
      .addCase(sendWithdrawalRequest.rejected, (state, { payload }) => {
        state.loader = false;
        toast.error(payload.error);
      })
      // payment related
     
  },
});

export default paymentSlice.reducer;
