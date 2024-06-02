import authSlice from "../features/authSlice/authSlice";
import sellerSlice from "../features/userSlice/sellerSlice";
import bannerSlice from "../features/bannerSlice/bannerSlice";
import categorySlice from "../features/categorySlice/categorySlice";
import dashboardSlice from "../features/dashboardSlice/dashboardSlice";
import orderSlice from "../features/orderSlice/orderSlice";
import paymentSlice from "../features/paymentSlice/paymentSlice";
import productSlice from "../features/productSlice/productSlice";

const rootSlice = {
  auth: authSlice,
  seller: sellerSlice,
  category: categorySlice,
  product: productSlice,
  order: orderSlice,
  payment: paymentSlice,
  dashboard: dashboardSlice,
  banner: bannerSlice,
};

export default rootSlice;
