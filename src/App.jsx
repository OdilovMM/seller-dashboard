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
} from "./pages";
import { MainLayout } from "./layout";
import ProtectedRoute from "./utils/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUserDetail } from "./features/authSlice/authSlice";
import { EditProduct, OrderDetails } from "./components";

function App() {
  const dispatch = useDispatch();
  const { userToken } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetail());
    }
  }, [dispatch, userToken]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
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
          <Route path="edit-product/:productId" element={<EditProduct />} />
          <Route path="orders" element={<Orders />} />
          <Route path="orders/details/:orderId" element={<OrderDetails />} />
          <Route path="payments" element={<Payments />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
