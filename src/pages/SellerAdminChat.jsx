import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaList } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  adminMessageToSeller,
  getSellerMessage,
  updateAdminMessage,
  messageClear,
} from "../features/chatSlice/chatSlice";
import { socket } from "../utils/utils";

const SellerAdminChat = () => {
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const [messageText, setMessageText] = useState("");
  const { userInfo } = useSelector((state) => state.auth);
  const { sellerAdminMessage, successMessage } = useSelector(
    (state) => state.chat
  );

  useEffect(() => {
    dispatch(getSellerMessage());
  }, [dispatch]);

  const handleSendMessageToAdmin = (e) => {
    e.preventDefault();
    if (messageText) {
      dispatch(
        adminMessageToSeller({
          senderId: userInfo._id,
          receiverId: "",
          senderName: userInfo?.shopInfo?.shopName,
          message: messageText,
        })
      );
      setMessageText("");
    } else {
      toast.error("Enter your message");
      return;
    }
  };

  useEffect(() => {
    socket.on("adminMessage", (msg) => {
      dispatch(updateAdminMessage(msg));
    });
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      socket.emit(
        "sellerSendMessageAdmin",
        sellerAdminMessage[sellerAdminMessage.length - 1]
      );
      dispatch(messageClear());
    }
  }, [successMessage, dispatch, sellerAdminMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [sellerAdminMessage]);

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full bg-[#3D464D] px-4 py-4 rounded-md h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative">
          <div className="w-full  md:pl-4">
            <div className="flex justify-between items-center">
              <div className="flex justify-start items-center gap-3">
                <div className="relative">
                  <img
                    src="https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-thumbnail.png"
                    className="w-[44px] h-[44px] rounded-full max-w-[46px] p-[2px] border-2 border-white"
                    alt=""
                  />

                  <div className="w-[10px] h-[10px] bg-green-500  rounded-full absolute right-0 bottom-0"></div>
                </div>
                <h2 className="text-white">Support</h2>
              </div>

              <div className="w-[35px] flex md:hidden h-[35px] rounded-sm bg-blue-500 shadow-lg hover:shadow-blue-500 justify-center cursor-pointer items-center text-white">
                <span>
                  <FaList />
                </span>
              </div>
            </div>

            <div className="py-4">
              <div className="bg-[#8c9a9ceb] h-[calc(100vh-290px)] rounded-[5px] p-3 overflow-y-auto">
                {sellerAdminMessage.map((mes, ind) => {
                  if (userInfo._id === mes.senderId) {
                    return (
                      <div
                        ref={scrollRef}
                        key={ind}
                        className="w-full flex justify-end items-center "
                      >
                        <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                          <div className="flex justify-center items-start flex-col bg-blue-300 text-[#333] px-2 rounded-tl-full rounded-bl-full rounded-tr-full ">
                            <span>{mes.message}</span>
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div
                        ref={scrollRef}
                        key={ind}
                        className="w-full flex justify-start items-center "
                      >
                        <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                          <div>
                            <img
                              src="https://e7.pngegg.com/pngimages/753/432/png-clipart-user-profile-2018-in-sight-user-conference-expo-business-default-business-angle-service-thumbnail.png"
                              className="w-[44px] h-[44px] rounded-full max-w-[46px] p-[2px] border-2 border-white"
                              alt=""
                            />
                          </div>
                          <div className="flex justify-center items-start flex-col bg-blue-300 text-[#333]  px-2 rounded-tl-full rounded-tr-full rounded-br-full">
                            <span>{mes.message}</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                })}
              </div>
            </div>

            <form onSubmit={handleSendMessageToAdmin} className="flex gap-3">
              <input
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                type="text"
                className="w-full flex justify-between px-2 border rounded-[5px] border-slate-700 items-center py-[5px] outline-none bg-[#85a8ac83]"
                placeholder="Type your text"
              />
              <button className="shadow-lg bg-green-600 px-4 py-2 h-[36px] rounded-sm">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerAdminChat;
