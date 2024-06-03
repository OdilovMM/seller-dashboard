import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/api";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

export const seller_login = createAsyncThunk(
  "auth/seller_login",
  async (info, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/auth/seller-login", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getUserDetail = createAsyncThunk(
  "auth/get_user_detail",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.get("/auth/get-user-detail", {
        withCredentials: true,
      });
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
      const { data } = await api.post("/auth/seller-register", info, {
        withCredentials: true,
      });

      localStorage.setItem("accessToken", data.token);
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
      const { data } = await api.patch("/auth/upload-profile-image", image, {
        withCredentials: true,
      });
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
      const { data } = await api.post("/auth/add-profile-address", detail, {
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
      const { data } = await api.get("/auth/logout", {
        withCredentials: true,
      });
      localStorage.removeItem("accessToken");

      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const roleToken = (token) => {
  if (token) {
    const decodeToken = jwtDecode(token);
    const expTime = new Date(decodeToken.exp * 1000);
    if (new Date() > expTime) {
      localStorage.removeItem("accessToken");
      return "";
    } else {
      return decodeToken.role;
    }
  } else {
    return "";
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
    role: roleToken(localStorage.getItem("accessToken")),
    token: localStorage.getItem("accessToken"),
  },
  reducers: {
    clearMessage: (state, _) => {
      state.errorMessage = "";
    },
    resetUser: (state, _) => {
      state.userInfo = "";
      state.role = "";
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
        state.role = roleToken(payload.token);
        toast.success(payload.message);
      })
      .addCase(seller_register.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
        toast.error(payload.error);
      })
      //
      .addCase(seller_login.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(seller_login.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.token = payload.token;
        state.role = roleToken(payload.token);
        toast.success(payload.message);
      })
      .addCase(seller_login.rejected, (state, { payload }) => {
        state.loader = false;
        toast.error(payload.message);
        console.log(payload.error);
      })
      .addCase(getUserDetail.pending, (state, { payload }) => {
        state.loader = true;
      })
      .addCase(getUserDetail.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = payload.userInfo;
      })
      .addCase(profileImageUpload.pending, (state, { payload }) => {
        state.imgLoader = true;
      })
      .addCase(profileImageUpload.fulfilled, (state, { payload }) => {
        state.imgLoader = false;
        state.userInfo = payload.userInfo;
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
        state.userInfo = payload.userInfo;
        toast.success(payload.message);
      })
      .addCase(addProfileInfo.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.error;
        toast.error(payload.error);
      })
      .addCase(logout.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.userInfo = "";
        toast.success(payload.message);
      });
  },
});
export const { resetUser } = authSlice.actions;

export default authSlice.reducer;
