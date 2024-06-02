import React, { useEffect, useState } from "react";
import { LuEye } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Pagination, Search } from "../components";
import { getSellerAllOrders } from "../features/orderSlice/orderSlice";

const SellerOrders = () => {
  const dispatch = useDispatch();
  const { myOrders } = useSelector((state) => state.order);
  const { userInfo } = useSelector((state) => state.auth);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [parPage, setParPage] = useState(5);

  const [show, setShow] = useState(false);

  useEffect(() => {
    const obj = {
      parPage: parseInt(parPage),
      page: parseInt(currentPage),
      searchValue,
      sellerId: userInfo._id,
    };
    dispatch(getSellerAllOrders(obj));
  }, [searchValue, currentPage, parPage, dispatch, userInfo]);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-black mb-2">View All Orders</h1>
      
        <div className="w-full p-4 bg-[#3D464D] rounded-[5px] ">
          <Search
            setParPage={setParPage}
            setSearch={setSearchValue}
            search={searchValue}
          />

          <div className="relative mt-5 overflow-x-auto">
            <div className="w-full text-sm text-left bg-[#475159]">
              <div className="text-sm text-[#fff] uppercase border-b border-slate-500 ">
                <div className="flex justify-between items-center">
                  <div className="py-3 w-[25%] font-bold ">Order ID</div>
                  <div className="py-3 w-[14%] font-bold ">PRICE</div>
                  <div className="py-3 w-[19%] font-bold ">Payment Status</div>
                  <div className="py-3 w-[19%] font-bold ">Order status</div>
                  <div className="py-3 w-[19%] font-bold ">Date</div>
                  <div className="py-3 w-[19%] font-bold ">Action</div>
                </div>
              </div>
            </div>
          </div>

          {myOrders &&
            myOrders.map((myOrder, index) => (
              <div key={index} className=" text-[#fff]  ">
                <div className="flex justify-between items-start border-b border-slate-600">
                  <div className="py-3 w-[25%] font-medium whitespace-nowrap ">
                    #{myOrder._id}
                  </div>
                  <div className="py-3 w-[14%] font-medium ">
                    ${myOrder?.price}
                  </div>
                  <div className="py-3 w-[19%] font-medium ">
                    {myOrder?.paymentStatus}
                  </div>
                  <div className="py-3 w-[19%] font-medium ">
                    {myOrder?.deliveryStatus}
                  </div>
                  <div className="py-3 w-[19%] font-medium ">
                    {myOrder?.date}
                  </div>
                  <div className="py-3 w-[19%] font-medium ">
                    <Link
                      to={`/seller/dashboard/orders/details/${myOrder._id}`}
                    >
                      <LuEye size={20} />
                    </Link>
                  </div>
                </div>
                <div
                  className={
                    show
                      ? "block border-b border-slate-500 bg-slate-700"
                      : "hidden"
                  }
                >
                  <div className="flex justify-start items-start border-b border-slate-700">
                    <div className="py-3 w-[24%] font-medium whitespace-nowrap ">
                      #111111111
                    </div>
                    <div className="py-3 w-[13%] font-medium ">$26435</div>
                    <div className="py-3 w-[18%] font-medium ">Pending</div>
                    <div className="py-3 w-[19%] font-medium ">Pending</div>
                  </div>

                  <div className="flex justify-start items-start border-b border-slate-700">
                    <div className="py-3 w-[24%] font-medium whitespace-nowrap ">
                      #222222
                    </div>
                    <div className="py-3 w-[13%] font-medium ">$26435</div>
                    <div className="py-3 w-[18%] font-medium ">Pending</div>
                    <div className="py-3 w-[19%] font-medium ">Pending</div>
                  </div>
                </div>
              </div>
            ))}

          {/* Pagination */}
          <div className="w-full justify-end flex mt-1 bottom-1 right-2">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={50}
              pages={parPage}
              showItem={3}
            />
          </div>
        </div>

    </div>
  );
};

export default SellerOrders;
