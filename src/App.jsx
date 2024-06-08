import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Dashboard,
  LoginPage,
  Register,
  AddProduct,
  AllProducts,
  Orders,
  Payments,
  Profile,
  LandingPage,
  SuccessPage,
} from "./pages";
import { MainLayout } from "./layout";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserDetail } from "./features/authSlice/authSlice";
import { EditProduct, OrderDetails } from "./components";
import ErrorDashboard from "./pages/ErrorDashboard";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userId) {
      dispatch(getUserDetail());
    }
  }, [dispatch, userId]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success?" element={<SuccessPage />} />
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
          <Route path="edit-product/:productId" element={<EditProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/details/:orderId" element={<OrderDetails />} />
          <Route path="payments" element={<Payments />} />
          <Route path="profile" element={<Profile />} />
          <Route path="*" element={<ErrorDashboard />} />
        </Route>
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
