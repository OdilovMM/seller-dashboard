import React, { useEffect, useState } from "react";
import { FaRegImage } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { PropagateLoader } from "react-spinners";
import {
  addBannerToHomePage,
  getBanner,
  messageClear,
  updateBanner,
} from "../features/bannerSlice/bannerSlice";
import toast from "react-hot-toast";

const AddBanner = () => {
  const dispatch = useDispatch();
  const [imageShow, setImageShow] = useState("");
  const [image, setImage] = useState("");
  const { productId } = useParams();

  const { loader, banner, successMessage, errorMessage } = useSelector(
    (state) => state.banner
  );

  const handleImage = (e) => {
    const files = e.target.files;
    const length = files.length;

    if (length > 0) {
      setImage(files[0]);
      setImageShow(URL.createObjectURL(files[0]));
    }
  };

  useEffect(() => {
    if (!loader) {
      // dispatch(getBanner(productId));
    }
  }, [productId, dispatch, loader]);

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("mainban", image);
    dispatch(addBannerToHomePage(formData));
    setImage("");
  };

  useEffect(() => {
    dispatch(getBanner(productId));
    console.log("get");
  }, [productId, dispatch]);

  const update = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("mainban", image);
    dispatch(updateBanner({ info: formData, bannerId: banner._id }));
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[#000000] font-semibold text-lg mb-3">Add Banner</h1>
      <div className="w-full p-4 bg-[#1b4345] rounded-md">
        {!banner && (
          <div>
            <form onSubmit={handleAddSubmit}>
              <div className="mb-4">
                <label
                  className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-red-500 w-full text-white"
                  htmlFor="image"
                >
                  <span className="text-4xl">
                    <FaRegImage />
                  </span>
                  <span>Select Banner Image </span>
                </label>
                <input
                  required
                  onChange={handleImage}
                  className="hidden"
                  type="file"
                  id="image"
                />
              </div>

              {imageShow && (
                <div className="mb-4">
                  <img className="w-full h-[300px]" src={imageShow} alt="" />
                </div>
              )}

              <button
                disabled={loader ? true : false}
                className="bg-red-500 w-[280px] hover:shadow-red-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
              >
                {loader ? "Submitting..." : "Add Banner"}
              </button>
            </form>
          </div>
        )}

        {banner && (
          <div>
            {
              <div className="mb-4">
                <img className="w-full h-[300px]" src={banner.banner} alt="" />
              </div>
            }

            <form onSubmit={update}>
              <div className="mb-4">
                <label
                  className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-red-500 w-full text-white"
                  htmlFor="image"
                >
                  <span className="text-4xl">
                    <FaRegImage />
                  </span>
                  <span>Select Banner Image </span>
                </label>
                <input
                  required
                  onChange={handleImage}
                  className="hidden"
                  type="file"
                  id="image"
                />
              </div>

              {imageShow && (
                <div className="mb-4">
                  <img className="w-full h-[300px]" src={imageShow} alt="" />
                </div>
              )}

              <button
                disabled={loader ? true : false}
                className="bg-red-500 w-[280px] hover:shadow-red-300/50 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3"
              >
                {loader ? "Submitting..." : "Update Banner"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBanner;
