import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";

export const getCustomers = createAsyncThunk(
  "chat/getCustomers",
  async (sellerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/get-customers/${sellerId}`, {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// for admin
export const getSellers = createAsyncThunk(
  "chat/getSellers",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/chat/admin-get-sellers", {
        withCredentials: true,
      });

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCustomerMessage = createAsyncThunk(
  "chat/getCustomerMessage",
  async (customerId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(
        `/chat/get-customer-message/${customerId}`,
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

export const sendMessageToCustomer = createAsyncThunk(
  "chat/sendMessageToCustomer",
  async (messageInfo, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/chat/send-message-to-customer`,
        messageInfo,
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

export const adminMessageToSeller = createAsyncThunk(
  "chat/adminMessageToSeller",
  async (messageInfo, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post(
        `/chat/admin-message-to-seller`,
        messageInfo,
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
export const getAdminMessages = createAsyncThunk(
  "chat/getAdminMessages",
  async (receiverId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/get-admin-messages/${receiverId}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSellerMessage = createAsyncThunk(
  "chat/getSellerMessage",
  async (receiverId, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get(`/chat/get-seller-messages`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    isLoading: false,
    successMessage: "",
    customers: [],
    messages: [],
    activeCustomer: [],
    activeSeller: [],
    activeAdmin: "",
    friends: [],
    sellerAdminMessage: [],
    currentSeller: {},
    currentCustomer: {},
    sellers: [],
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
    updateMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
    updateSellers: (state, { payload }) => {
      state.activeSeller = payload;
    },
    updateCustomer: (state, { payload }) => {
      state.activeCustomer = payload;
    },
    updateAdminMessage: (state, { payload }) => {
      state.sellerAdminMessage = [...state.sellerAdminMessage, payload];
    },
    updateSellerMessage: (state, { payload }) => {
      state.sellerAdminMessage = [...state.sellerAdminMessage, payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.customers = payload.customers;
      })
      .addCase(getCustomers.rejected, (state, { payload }) => {
        state.isLoading = false;
      })

      .addCase(getCustomerMessage.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getCustomerMessage.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.messages = payload.messages;
        state.currentCustomer = payload.currentCustomer;
      })
      .addCase(getCustomerMessage.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(sendMessageToCustomer.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(sendMessageToCustomer.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        let tempFriends = state.customers;
        let index = tempFriends.findIndex(
          (f) => f.fdId === payload.sentMessage.receiverId
        );
        while (index > 0) {
          let temp = tempFriends[index];
          tempFriends[index] = tempFriends[index - 1];
          tempFriends[index - 1] = temp;
          index--;
        }
        state.customers = tempFriends;
        state.messages = [...state.messages, payload.sentMessage];
        state.successMessage = "success";
      })
      .addCase(sendMessageToCustomer.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(getSellers.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(getSellers.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.sellers = payload.sellers;
      })
      .addCase(getSellers.rejected, (state, { payload }) => {
        state.isLoading = false;
      })

      .addCase(adminMessageToSeller.pending, (state, { payload }) => {
        state.isLoading = true;
      })
      .addCase(adminMessageToSeller.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.sellerAdminMessage = [
          ...state.sellerAdminMessage,
          payload.adminMessages,
        ];

        state.successMessage = "success";
      })
      .addCase(adminMessageToSeller.rejected, (state, { payload }) => {
        state.isLoading = false;
      })
      .addCase(getAdminMessages.fulfilled, (state, { payload }) => {
        state.sellerAdminMessage = payload.messages;
        state.currentSeller = payload.currentSeller;
      })
      .addCase(getSellerMessage.fulfilled, (state, { payload }) => {
        state.sellerAdminMessage = payload.messages;
      });
  },
});
export const {
  messageClear,
  updateMessage,
  updateSellers,
  updateCustomer,
  updateAdminMessage,
  updateSellerMessage,
} = chatSlice.actions;
export default chatSlice.reducer;
