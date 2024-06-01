import React, { forwardRef, useEffect, useState } from "react";
import { LuTimer } from "react-icons/lu";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { GiCash } from "react-icons/gi";
import { BiMoneyWithdraw } from "react-icons/bi";
import { FixedSizeList as List } from "react-window";
import { useDispatch, useSelector } from "react-redux";
import {
  getSellerPaymentDetails,
  sendWithdrawalRequest,
} from "../features/paymentSlice/paymentSlice";
import toast from "react-hot-toast";
import moment from "moment";

function handleOnWheel({ deltaY }) {}

const outerElType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const Payments = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    pendingWithdraws,
    successWithdraws,
    totalAmount,
    withdrawAmount,
    availableAmount,
    pendingAmount,
    loader,
  } = useSelector((state) => state.payment);

  useEffect(() => {
    dispatch(getSellerPaymentDetails(userInfo._id));
  }, [dispatch, userInfo]);

  const [amount, setAmount] = useState(0);

  const handleRequest = (e) => {
    e.preventDefault();
    if (availableAmount - amount > 10) {
      dispatch(
        sendWithdrawalRequest({
          amount,
          sellerId: userInfo._id,
        })
      );
      setAmount(0);
    } else {
      toast.error("Insufficient Balance");
    }
  };

  useEffect(() => {
    //
  }, []);

  const Row = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm">
        <div className="w-[25%] p-2 whitespace-nowrap text-[#fff]">
          {index + 1}
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap text-[#fff]">
          ${pendingWithdraws[index]?.amount}
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="px-3 py-1 bg-[#6e7376] text-[#fff] rounded-[3px]">
            {pendingWithdraws[index]?.status}
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap text-[#fff]">
          {moment(pendingWithdraws[index]?.createdAt).format("LLL")}
        </div>
      </div>
    );
  };

  const Rows = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm">
        <div className="w-[10%] p-2 whitespace-nowrap text-[#fff]">
          {index + 1}
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap text-[#fff]">
          ${successWithdraws[index]?.amount}
        </div>
        <div className="w-[30%] p-2 whitespace-nowrap">
          <span className="px-3 py-1 bg-[#6e7376] text-[#fff] rounded-[3px]">
            {successWithdraws[index]?.status}
          </span>
        </div>
        <div className="w-[30%] p-2 whitespace-nowrap text-[#fff]">
          {moment(successWithdraws[index]?.createdAt).format("LLL")}
        </div>
      </div>
    );
  };
  return (
    <div className="px-2 md:px-7 py-5 ">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-4">
        <div className="flex justify-between items-center shadow-xl p-5 border-b-[2px] bg-[#b1d6f2] rounded-md gap-3">
          <div className="flex flex-col justify-start  items-start text-[#333]">
            <h2 className="text-3xl font-semibold">${totalAmount}</h2>
            <span className="text-md font-semibold">Total Sales</span>
          </div>
          <div className="w-[45px] h-[45px] rounded-full justify-center items-center">
            <MdOutlineCurrencyExchange color="blue" size={45} />
          </div>
        </div>
        <div className="flex justify-between items-center shadow-xl p-5 border-b-[2px] bg-[#b1d6f2] rounded-md gap-3">
          <div className="flex flex-col justify-start  items-start text-[#333]">
            <h2 className="text-3xl font-semibold">${availableAmount}</h2>
            <span className="text-md font-semibold">Available Amount</span>
          </div>
          <div className="w-[45px] h-[45px] rounded-full  justify-center items-center">
            <GiCash color="blue" size={45} />
          </div>
        </div>
        <div className="flex justify-between items-center shadow-xl p-5 border-b-[2px] bg-[#b1d6f2] rounded-md gap-3">
          <div className="flex flex-col justify-start  items-start text-[#333]">
            <h2 className="text-3xl font-semibold">${withdrawAmount}</h2>
            <span className="text-md font-semibold">Withdrawal Amount</span>
          </div>
          <div className="w-[45px] h-[45px] rounded-full  justify-center items-center">
            <BiMoneyWithdraw color="blue" size={45} />
          </div>
        </div>
        <div className="flex justify-between items-center shadow-xl p-5 border-b-[2px] bg-[#b1d6f2] rounded-md gap-3">
          <div className="flex flex-col justify-start  items-start text-[#333]">
            <h2 className="text-3xl font-semibold">${pendingAmount}</h2>
            <span className="text-md font-semibold">Pending Amount</span>
          </div>
          <div className="w-[45px] h-[45px] rounded-full  justify-center items-center">
            <LuTimer color="blue" size={45} />
          </div>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-2 pb-4">
        <div className="bg-[#3D464D] text-white rounded-[5px] p-5">
          <h1 className="text-lg">Send Request</h1>
          <div className="pt-5 mb-4">
            <form onSubmit={handleRequest}>
              <div className="flex gap-3 flex-wrap">
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  type="number"
                  className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333] md:w-[70%]"
                  name="amount"
                  min="0"
                />
                <button
                  disabled={loader}
                  className="bg-[#94A3B8] w-[25%] py-2 px-2 rounded-[5px]"
                >
                  {loader ? <span>Requesting...</span> : <span>Submit</span>}
                </button>
              </div>
            </form>
          </div>

          <div>
            <h2 className="pb-4 text-lg">Pending Request</h2>

            <div className="w-full overflow-x-auto">
              <div className="flex bg-[#65727a] uppercase text-[#fff] text-xs font-bold min-w-[340px] rounded-md">
                <div className="w-[25%] p-2"> No </div>
                <div className="w-[25%] p-2"> Amount </div>
                <div className="w-[25%] p-2"> Status </div>
                <div className="w-[25%] p-2"> Date </div>
              </div>
              {
                <List
                  style={{ minWidth: "340px" }}
                  className="List"
                  height={350}
                  itemCount={pendingWithdraws?.length}
                  itemSize={35}
                  outerElementType={outerElType}
                >
                  {Row}
                </List>
              }
            </div>
          </div>
        </div>

        <div className="bg-[#3D464D] text-white rounded-[5px] p-5">
          <h1 className="text-lg mb-5">Successful Withdraw</h1>

          <div>
            <div className="w-full overflow-x-auto">
              <div className="flex bg-[#65727a] uppercase text-[#fff] text-xs font-bold min-w-[340px] rounded-md">
                <div className="w-[10%] p-2"> No </div>
                <div className="w-[25%] p-2"> Amount </div>
                <div className="w-[30%] p-2"> Status </div>
                <div className="w-[30%] p-2"> Date </div>
              </div>
              {
                <List
                  style={{ minWidth: "340px" }}
                  className="List"
                  height={440}
                  itemCount={successWithdraws?.length}
                  itemSize={35}
                  outerElementType={outerElType}
                >
                  {Rows}
                </List>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
