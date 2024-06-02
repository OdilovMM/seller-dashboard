import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";


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
    sellers: [],
    seller: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
     
      .addCase(getSellerDetail.fulfilled, (state, { payload }) => {
        state.seller = payload.seller;
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
