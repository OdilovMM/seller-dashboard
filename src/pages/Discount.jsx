import React, { useState } from "react";
import { Search, Pagination } from "../components";

import { FaPenNib } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { MdAutoDelete } from "react-icons/md";
import { LuEye } from "react-icons/lu";

const Discount = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [parPage, setParPage] = useState(5);
  const [pages, setPages] = useState(5);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-black mb-2">Products with Discounts</h1>
      <div className="w-full p-4 bg-[#3D464D] rounded-md">
        {/* <Search setParPage={setParPage} setSearch={setSearch} search={search} /> */}
        <div className="relative overflow-x-auto mt-4">
          <table className="w-full text-sm text-left text-[#d0d2d6]">
            <thead className="text-sm text-[#d0d2d6] uppercase border-b border-slate-700">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  Image
                </th>
                <th scope="col" className="py-3 px-4">
                  Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Category
                </th>
                <th scope="col" className="py-3 px-4">
                  Brand
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Discount
                </th>
                <th scope="col" className="py-3 px-4">
                  Stock
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {[1, 2, 3, 4, 5].map((d, i) => (
                <tr key={i}>
                  <td
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {d}
                  </td>
                  <td
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <img
                      className="w-[45px] h-[45px]"
                      src=""
                      alt=""
                    />
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    T-Shirt
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    Clothes
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    Adidas
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    210$
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    12 %
                  </td>
                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    15
                  </td>

                  <td
                    className="py-3 px-4 font-medium whitespace-nowrap"
                  >
                    <div className="flex flex-start items-center gap-4">
                      <Link className="px-[6px] cursor-pointer">
                        <FaPenNib size={18} />
                      </Link>
                      <Link className="px-[6px] cursor-pointer">
                        <LuEye size={18} />
                      </Link>
                      <button>
                        <MdAutoDelete size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="w-full justify-end flex mt-1 bottom-1 right-2">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItem={50}
            pages={pages}
            showItem={2}
          />
        </div>
      </div>
    </div>
  );
};
export default Discount;
