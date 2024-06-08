import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { activatePaymentAccount } from "./../features/userSlice/sellerSlice";
import { FadeLoader } from "react-spinners";
import error from "./../assets/error.svg";
import success from "./../assets/success.svg";

const SuccessPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(window.location.search);
  const activeCode = queryParams.get("activeCode");
  const { loader, successMessage,errorMessage } = useSelector((state) => state.seller);
//   const errorMessage = true;
  useEffect(() => {
    dispatch(activatePaymentAccount(activeCode));
  }, [dispatch, activeCode]);

  const redirect = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="w-screen h-screen flex justify-center items-center flex-col gap-4">
        {loader ? (
          <FadeLoader />
        ) : errorMessage ? (
          <>
            <div className="w-[450px] h-[450px]">
              <img src={error} alt="" />
            </div>
            <button
              onClick={redirect}
              className="px-5 py-2 bg-green-700 rounded-sm text-white"
            >
              Back to Dashboard
            </button>
          </>
        ) : (
          successMessage && (
            <>
              <div className="w-[450px] h-[450px]">
                <img src={success} alt="" />
              </div>
              <button
                onClick={redirect}
                className="px-5 py-2 bg-green-700 rounded-sm text-white"
              >
                Back to Dashboard
              </button>
            </>
          )
        )}
      </div>
    </div>
  );
};

export default SuccessPage;
