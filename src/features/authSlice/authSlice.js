import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export const seller_login = createAsyncThunk(
  "auth/seller_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/seller/seller-login", info, {
        withCredentials: true,
      });
      localStorage.setItem("sellerToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserDetail = createAsyncThunk(
  "auth/get_user_detail",
  async (_, { rejectWithValue, fulfillWithValue, getState }) => {
    try {
      const state = getState();
      const token = state.auth.token;

      if (!token) {
        throw new Error("Token not found");
      }

      const { data } = await api.get(
        "/seller/get-me-detail",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
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

export const seller_register = createAsyncThunk(
  "auth/seller_register",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/seller/seller-register", info, {
        withCredentials: true,
      });

      localStorage.setItem("sellerToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const profileImageUpload = createAsyncThunk(
  "auth/uploadProfileImage",
  async (image, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.patch(
        "/seller//upload-seller-profile-image",
        image,
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

export const addProfileInfo = createAsyncThunk(
  "auth/addProfileInfo",
  async (detail, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/seller/seller-add-address", detail, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/seller/seller-logout", {
        withCredentials: true,
      });
      localStorage.removeItem("sellerToken");

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    // console.error("Token decoding failed", error);
    return null;
  }
};

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    imgLoader: false,
    userInfo: "",
    userId: decodeToken(localStorage.getItem("sellerToken")),
    token: localStorage.getItem("sellerToken"),
  },
  reducers: {
    clearMessage: (state, _) => {
      state.errorMessage = "";
    },
    resetUser: (state, _) => {
      state.userInfo = "";
      state.userId = "";
      state.token = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(seller_register.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(seller_register.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.token = payload.token;
        state.userId = decodeToken(payload.token);
        toast.success(`Welcome ${payload.data.user.firstName}`);
      })
      .addCase(seller_register.rejected, (state, { payload }) => {
        state.loader = false;
        toast.error(payload.message);
      })
      //
      .addCase(seller_login.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(seller_login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.token = payload.token;
        state.userId = decodeToken(payload.token);
        toast.success(payload.status);
      })
      .addCase(seller_login.rejected, (state, { payload }) => {
        state.loader = false;
        toast.error(payload.message);
      })
      .addCase(getUserDetail.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(getUserDetail.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.data.seller;
      })
      .addCase(profileImageUpload.pending, (state, { payload }) => {
        state.imgLoader = true;
      })
      .addCase(profileImageUpload.fulfilled, (state, { payload }) => {
        state.imgLoader = false;
        state.userInfo = payload.data.userInfo;
        toast.success(payload.message);
      })
      .addCase(profileImageUpload.rejected, (state, { payload }) => {
        state.imgLoader = false;
        state.errorMessage = payload.error;
        toast.error(payload.error);
      })
      .addCase(addProfileInfo.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(addProfileInfo.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.data.sellerInfo;
        toast.success(payload.data.status);
      })
      .addCase(addProfileInfo.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
        toast.error(payload.error);
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = "";
        toast.success(payload.status);
      });
  },
});
export const { resetUser } = authSlice.actions;

export default authSlice.reducer;
