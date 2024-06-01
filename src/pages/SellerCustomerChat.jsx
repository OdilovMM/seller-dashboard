import React, { useEffect, useRef, useState } from "react";
import { FaList } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import {
  getCustomerMessage,
  getCustomers,
  sendMessageToCustomer,
  messageClear,
  updateMessage,
} from "../features/chatSlice/chatSlice";
import { Link, useParams } from "react-router-dom";
import { socket } from "../utils/utils";

const SellerCustomerChat = () => {
  const scrollRef = useRef();

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { customers, currentCustomer, messages, successMessage } = useSelector(
    (state) => state.chat
  );
  const { customerId } = useParams();
  const [show, setShow] = useState(false);
  const sellerId = 65;
  const [messageText, setMessageText] = useState("");
  const [incomingMessage, setIncomingMessage] = useState("");

  useEffect(() => {
    dispatch(getCustomers(userInfo._id));
  }, [userInfo, dispatch]);

  useEffect(() => {
    if (customerId) {
      dispatch(getCustomerMessage(customerId));
    }
  }, [customerId, dispatch]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageText) {
      dispatch(
        sendMessageToCustomer({
          senderId: userInfo._id,
          receiverId: customerId,
          name: userInfo?.shopInfo?.shopName,
          messageText,
        })
      );
      setMessageText("");
    } else {
      toast.error("Enter your message");
      return;
    }
  };

  useEffect(() => {
    socket.on("customerMessage", (msg) => {
      setIncomingMessage(msg);
    });
  }, []);

  useEffect(() => {
    if (successMessage) {
      socket.emit("sendMessageSeller", messages[messages.length - 1]);
      dispatch(messageClear());
    }
  }, [successMessage, dispatch, messages]);

  useEffect(() => {
    if (incomingMessage) {
      if (
        customerId === incomingMessage.senderId &&
        userInfo._id === incomingMessage.receiverId
      ) {
        dispatch(updateMessage(incomingMessage));
      } else {
        toast.success(incomingMessage.senderName + " " + "Send a message");
        dispatch(messageClear());
      }
    }
  }, [incomingMessage, dispatch, customerId, userInfo]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full bg-[#3D464D] px-4 py-4 rounded-md h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative">
          <div
            className={`w-[280px] h-full absolute z-10 ${
              show ? "-left-[16px]" : "-left-[336px]"
            } md:left-0 md:relative transition-all `}
          >
            <div className="w-full h-[calc(100vh-177px)] bg-[#a9a8bc] md:bg-transparent overflow-y-auto">
              <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 text-white">
                <h2>Customers</h2>
                <span
                  className="block cursor-pointer md:hidden"
                  onClick={() => setShow(!show)}
                >
                  <IoMdClose />{" "}
                </span>
              </div>
              <ul className="flex flex-col gap-1 w-full">
                {customers.map((customer, index) => {
                  return (
                    <li
                      key={index}
                      className="flex flex-row w-full hover:bg-slate-500 active:bg-slate-500"
                    >
                      <Link
                        key={index}
                        to={`/seller/dashboard/chat-customer/${customer?.fdId}`}
                        className={`flex w-full justify-start gap-0 items-center text-white px-2 py-1 rounded-sm cursor-pointer`}
                      >
                        <div className="relative">
                          <img
                            src="https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp"
                            className="w-[39px] h-[39px] rounded-full max-w-[38px] p-[2px] border border-white-[5px]"
                            alt=""
                          />

                          <div className="w-[10px] h-[10px] bg-green-500  rounded-full absolute right-0 bottom-0"></div>
                        </div>
                        <div className="flex justify-center items-start flex-col w-full">
                          <div className="flex justify-between pl-2 items-center w-full">
                            <h2>{customer?.name}</h2>
                          </div>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="w-full md:w-[calc(100%-200px)] md:pl-4">
            <div className="flex justify-between items-center">
              {sellerId && (
                <div className="flex justify-start items-center gap-3">
                  <div className="relative">
                    <img
                      src="https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp"
                      className="w-[44px] h-[44px] rounded-full max-w-[46px] p-[2px] border-2 border-white"
                      alt=""
                    />

                    <div className="w-[10px] h-[10px] bg-green-500  rounded-full absolute right-0 bottom-0"></div>
                  </div>
                  <h2 className="text-white">{currentCustomer?.name}</h2>
                </div>
              )}

              <div
                onClick={() => setShow(!show)}
                className="w-[35px] flex md:hidden h-[35px] rounded-sm bg-blue-500 shadow-lg hover:shadow-blue-500 justify-center cursor-pointer items-center text-white"
              >
                <span>
                  <FaList />
                </span>
              </div>
            </div>

            <div className="py-4">
              <div className="bg-[#98a3a4eb] h-[calc(100vh-290px)] rounded-[5px]  overflow-y-auto">
                {customerId ? (
                  messages.map((message, index) => {
                    if (message?.senderId === customerId) {
                      return (
                        <div
                          key={index}
                          ref={scrollRef}
                          className="w-full flex justify-start items-center "
                        >
                          <div
                            ref={scrollRef}
                            className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]"
                          >
                            <div>
                              <img
                                src="https://pics.craiyon.com/2023-07-15/dc2ec5a571974417a5551420a4fb0587.webp"
                                className="w-[44px] h-[44px] rounded-full max-w-[46px] p-[2px] border-2 border-white"
                                alt=""
                              />
                            </div>
                            <div className="flex justify-center items-start flex-col w-full bg-blue-300 text-[#333] py-1 px-2 rounded-tl-full rounded-tr-full rounded-br-full">
                              <span>{message?.message}</span>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          ref={scrollRef}
                          key={index}
                          className="w-full flex justify-end items-center "
                        >
                          <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                            <div className="flex justify-center items-start flex-col bg-blue-300 text-[#333] py-1 px-2 rounded-tl-full rounded-bl-full rounded-tr-full ">
                              <span>{message?.message}</span>
                            </div>

                            <div>
                              <img
                                src={userInfo.image}
                                className="w-[44px] h-[44px] rounded-full max-w-[46px] p-[2px] border-2 border-white"
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })
                ) : (
                  <div className="w-full h-full flex justify-center items-center bg-slate-50">
                    <span className="text-[26px]">Select a customer</span>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleSendMessage} className="flex gap-3">
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

export default SellerCustomerChat;
