import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Dashboard,
  LandingPage,
  LoginPage,
  Register,
  AddProduct,
  AllProducts,
  Discount,
  Orders,
  Payments,
  SellerCustomerChat,
  SellerAdminChat,
  Profile,
} from "./pages";
import { MainLayout } from "./layout";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserDetail } from "./features/authSlice/authSlice";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(getUserDetail());
    }
  }, [token, dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/seller/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="products" element={<AllProducts />} />
          <Route path="discount-product" element={<Discount />} />
          <Route path="orders" element={<Orders />} />
          <Route path="payments" element={<Payments />} />
          <Route path="chat-customer" element={<SellerCustomerChat />} />
          <Route path="chat-support" element={<SellerAdminChat />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
