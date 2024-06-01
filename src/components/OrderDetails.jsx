import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSellerSingleOrderDetail,
  sellerUpdateOrderStatus,
} from "../features/orderSlice/orderSlice";

const OrderDetails = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { order } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getSellerSingleOrderDetail(orderId));
  }, [dispatch, orderId]);

  const [status, setStatus] = useState("");
  useEffect(() => {
    setStatus(order?.deliveryStatus);
  }, [order]);

  const updateStatus = (e) => {
    dispatch(
      sellerUpdateOrderStatus({ orderId, info: { status: e.target.value } })
    );
    setStatus(e.target.value);
  };


  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#3D464D] rounded-md">
        <div className="flex justify-between items-center p-4">
          <h2 className="text-xl text-[#d0d2d6]">Order Details</h2>
          <select
            onChange={updateStatus}
            value={status}
            name=""
            id=""
            className="px-4 py-2 focus:border-indigo-500 outline-none bg-[#818994] border border-slate-700 rounded-md text-[#d0d2d6]"
          >
             <option value="pending">pending</option>
            <option value="processing">processing</option>
            <option value="warehouse">warehouse</option>
            <option value="placed">placed</option>
            <option value="cancelled">cancelled</option>
          </select>
        </div>

        <div className="p-4">
          <div className="flex gap-2 text-lg text-[#d0d2d6]">
            <h2>#{order?._id}</h2>
            <span>{order?.date}</span>
          </div>

          <div className="flex flex-wrap">
            {/* left */}
            <div className="w-[50%]">
              <div className="pr-3 text-[#d0d2d6] text-lg">
                <div className="flex flex-col gap-1">
                  <h2 className="pb-2 font-semibold">
                    Deliver To : {order?.shippingInfo}
                  </h2>
                </div>

                <div className="flex justify-start items-start gap-3">
                  <h2>Payment Status:</h2>
                  <span className="text-base">{order?.paymentStatus}</span>
                </div>

                <span>Price : ${order?.price}</span>

                {order?.products?.map((product, ind) => (
                  <div
                    key={ind}
                    className="mt-4 flex flex-col gap-4 bg-[#728382ef] rounded-[5px]"
                  >
                    <div className="text-white">
                      <div className="flex gap-3 flex-row items-start justify-center text-medium">
                        <div className="w-3/12">
                          <img
                            className="w-full h-full object-contain"
                            src={product?.images[0]}
                            alt=""
                          />
                        </div>
                        <div className="w-9/12 flex flex-row">
                          <div>
                            <h2 className="capitalize">
                              Name: {product?.name}
                            </h2>
                            <span className="capitalize">
                              Brand: {product?.brand}
                            </span>
                          </div>
                          <div>
                            <h2 className="capitalize">
                              {" "}
                              Shop Name: {product?.shopName}{" "}
                            </h2>
                            <span className="capitalize">
                              {" "}
                              Quantity: {product?.quantity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
