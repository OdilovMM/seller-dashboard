import React, { useEffect } from "react";
import { MdOutlineCurrencyExchange } from "react-icons/md";
import { IoCart } from "react-icons/io5";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import { SiShopify } from "react-icons/si";
import { LuTimer } from "react-icons/lu";
import { MoonLoader } from "react-spinners";

import { useDispatch, useSelector } from "react-redux";
import { getSellerDashboardInfo } from "../features/dashboardSlice/dashboardSlice";

const Dashboard = () => {
  console.log("Dashboard is working");

  const dispatch = useDispatch();
  const {
    totalSales,
    totalOrders,
    totalProducts,
    recentOrders,
    totalPendingOrder,
    loader,
  } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(getSellerDashboardInfo());
  }, [dispatch]);

  const state = {
    series: [
      {
        name: "Orders",
        data: [23, 27, 32, 45, 45, 98, 32, 12, 45, 87, 56, 15],
      },
      {
        name: "Revenue",
        data: [23, 22, 34, 46, 45, 95, 32, 16, 45, 17, 56, 15],
      },
      {
        name: "Seles",
        data: [23, 22, 14, 26, 35, 95, 32, 36, 45, 57, 86, 12],
      },
    ],
    options: {
      color: ["#181ee8", "#181ee8"],
      plotOptions: {
        radius: 30,
      },
      chart: {
        background: "transparent",
        foreColor: "#d0d2d6",
      },
      dataLabels: {
        enabled: false,
      },
      strock: {
        show: true,
        curve: ["smooth", "straight", "stepline"],
        lineCap: "butt",
        colors: "#333",
        width: 0.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apl",
          "May",
          "Jun",
          "Jul",
          "AUg",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        legend: {
          position: "top",
        },
        responsive: [
          {
            breakpoint: 565,
            yaxis: {
              categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apl",
                "May",
                "Jun",
                "Jul",
                "AUg",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ],
            },
            options: {
              plotOptions: {
                bar: {
                  horizontal: true,
                },
              },
              chart: {
                height: "550px",
              },
            },
          },
        ],
      },
    },
  };

  return (
    <>
      {loader ? (
        <div className="w-full min-h-[350px] justify-center items-center flex">
          <MoonLoader />
        </div>
      ) : (
        <div className="px-2 md:px-7 py-5 ">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
            <div className="flex justify-between items-center shadow-xl p-5 border-b-[2px] bg-[#dfcbcb] rounded-md gap-3">
              <div className="flex flex-col justify-start  items-start text-[#333]">
                <h2 className="text-3xl font-semibold">{totalSales}</h2>
                <span className="text-md font-semibold">Total Sales</span>
              </div>
              <div className="w-[45px] h-[45px] rounded-full justify-center items-center">
                <MdOutlineCurrencyExchange size={45} />
              </div>
            </div>
            <div className="flex justify-between items-center shadow-xl p-5 border-b-[2px] bg-[#dfcbcb] rounded-md gap-3">
              <div className="flex flex-col justify-start  items-start text-[#333]">
                <h2 className="text-3xl font-semibold">{totalProducts}</h2>
                <span className="text-md font-semibold">Total Products</span>
              </div>
              <div className="w-[45px] h-[45px] rounded-full  justify-center items-center">
                <IoCart size={45} />
              </div>
            </div>
            <div className="flex justify-between items-center shadow-xl p-5 border-b-[2px] bg-[#dfcbcb] rounded-md gap-3">
              <div className="flex flex-col justify-start  items-start text-[#333]">
                <h2 className="text-3xl font-semibold">{totalOrders}</h2>
                <span className="text-md font-semibold">Orders</span>
              </div>
              <div className="w-[45px] h-[45px] rounded-full  justify-center items-center">
                <SiShopify size={45} />
              </div>
            </div>
            <div className="flex justify-between items-center shadow-xl p-5 border-b-[2px] bg-[#dfcbcb] rounded-md gap-3">
              <div className="flex flex-col justify-start  items-start text-[#333]">
                <h2 className="text-3xl font-semibold">{totalPendingOrder}</h2>
                <span className="text-md font-semibold">Pending Orders</span>
              </div>
              <div className="w-[45px] h-[45px] rounded-full  justify-center items-center">
                <LuTimer size={45} />
              </div>
            </div>
          </div>
          {/* chat box and graph */}
          <div className="w-full flex flex-wrap mt-8">
            <div className="w-full lg:w-7/12 lg:pr-3">
              <div className="w-full bg-[#3D464D] p-4 rounded-[5px]">
                <Chart
                  options={state.options}
                  series={state.series}
                  type="bar"
                  height={350}
                />
              </div>
            </div>

           
          </div>

          {/* table */}
          <div className="w-full p-4 bg-[#3D464D] mt-8 rounded-md">
            {/* table header */}
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-[#fff] text-lg pb-3">
                Recent Orders
              </h3>
              <Link className="font-normal text-sm text-[#fff] ">View All</Link>
            </div>

            {/* table data info */}

            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-[#fff] uppercase  text-left ">
                <thead className="text-sm text-[#fff] uppercase border-b border-slate-500 ">
                  <tr>
                    <th className="py-3 px-4" scope="col">
                      ORDER ID
                    </th>
                    <th className="py-3 px-4" scope="col">
                      PRICE
                    </th>
                    <th className="py-3 px-4" scope="col">
                      payment status
                    </th>
                    <th className="py-3 px-4" scope="col">
                      order status
                    </th>
                    <th className="py-3 px-4" scope="col">
                      active
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((data, index) => (
                    <tr key={index}>
                      <td className="py-4 px-4 font-medium whitespace-nowrap">
                        #{data?._id}
                      </td>
                      <td className="py-3 px-4 font-medium whitespace-nowrap">
                        ${data?.price}
                      </td>
                      <td className="py-3 px-4 font-medium whitespace-nowrap">
                        {data?.paymentStatus}
                      </td>
                      <td className="py-3 px-4 font-medium whitespace-nowrap">
                        {data?.deliveryStatus}
                      </td>
                      <td className="py-3 px-4 font-medium whitespace-nowrap">
                        <Link
                          to={`/seller/dashboard/orders/details/${data?._id}`}
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
