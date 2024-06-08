import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { LuImagePlus } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../features/categorySlice/categorySlice";
import {
  getA_Product,
  updateProduct,
  productImageUpdate,
} from "../features/productSlice/productSlice";
import { ScaleLoader, FadeLoader } from "react-spinners";

const EditProduct = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.category);
  const {
    loader,
    product: singleProduct,
    imageLoader,
    success,
  } = useSelector((state) => state.product);
  const { productId } = useParams();

  useEffect(() => {
    dispatch(
      getAllCategories({
        search: "",
        page: "",
        parPage: "",
      })
    );
  }, [dispatch]);

  // get specific product based on the id

  useEffect(() => {
    dispatch(getA_Product(productId));
  }, [dispatch, productId]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
  });

  const inputHandler = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const [show, setShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [showImage, setImageShow] = useState([]);

  const handleCategorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value) {
      let searchedValue = allCategory.filter(
        (c) => c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(searchedValue);
    } else {
      setAllCategory(categories);
    }
  };

  const handleChangeImage = (img, files) => {
    if (files.length > 0) {
      dispatch(
        productImageUpdate({
          oldImage: img,
          newImage: files[0],
          productId,
        })
      );
    }
  };

  useEffect(() => {
    setProduct({
      name: singleProduct.name,
      description: singleProduct.description,
      discount: singleProduct.discount,
      price: singleProduct.price,
      brand: singleProduct.brand,
      stock: singleProduct.stock,
    });
    setCategory(singleProduct.category);
    setImageShow(singleProduct.images);
  }, [singleProduct]);

  useEffect(() => {
    if (categories.length > 0) {
      setAllCategory(categories);
    }
  }, [categories]);

  const handleUpdateProduct = (e) => {
    e.preventDefault();
    const obj = {
      name: product.name,
      description: product.description,
      discount: product.discount,
      price: product.price,
      brand: product.brand,
      stock: product.stock,
      productId: productId,
    };
    dispatch(updateProduct(obj));
  };

  return (
    <div className="px-2 lg:px-7 pt-4">
      <div className="w-full p-4 bg-[#3D464D] rounded-[5px] ">
        <div className="flex justify-between items-center pb-4">
          <h2 className="text-white font-semibold">Edit Product</h2>
          <Link
            to="/seller/dashboard/products"
            className="bg-[#a6afb6] px-2 py-1 rounded-[5px]"
          >
            All Products
          </Link>
        </div>
        <div>
          <form onSubmit={handleUpdateProduct}>
            <div className="flex flex-col mb-2 md:flex-row gap-3 w-full text-white">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Product name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Product name"
                  onChange={inputHandler}
                  value={product.name}
                  className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">Brand Name</label>
                <input
                  type="text"
                  name="brand"
                  id="brand"
                  placeholder="Brand Name"
                  onChange={inputHandler}
                  value={product.brand}
                  className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                />
              </div>
            </div>

            <div className="flex flex-col mb-2 md:flex-row gap-3 w-full text-white">
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="category">Category</label>
                <input
                  readOnly
                  onClick={() => setShow(!show)}
                  type="text"
                  id="category"
                  placeholder="--select category--"
                  onChange={inputHandler}
                  value={category}
                  className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#dfe2dd] border border-slate-700 rounded-md text-[#333]"
                />

                <div
                  className={`absolute top-[39%] rounded-md bg-[#3D464D] gap-1 w-full overflow-hidden transition-all ${
                    show ? "h-[250px]" : "h-0 hidden"
                  }`}
                >
                  <div className="w-full  absolute mt-[1px]">
                    <input
                      value={searchValue}
                      onChange={handleCategorySearch}
                      type="text"
                      //   className="px-3 w-full focus:border-gray-400 outline-none  rounded-[3px] text-black overflow-hidden"
                      className="px-4 py-2 w-full  outline-none bg-[#dfe2dd] border border-slate-700 rounded-md text-[#333]"
                      name=""
                      placeholder="Search"
                      id=""
                    />
                  </div>
                  <div className="pt-14"></div>
                  <div className="flex justify-start items-start flex-col h-[200px] overflow-y-scroll ">
                    {allCategory.length > 0 &&
                      allCategory.map((categ, index) => (
                        <span
                          key={index}
                          className={`px-4 py-1 font-semibold mb-1 hover:bg-gray-600 w-full cursor-pointer ${
                            category === categ.name && "bg-gray-600"
                          } `}
                          onClick={() => {
                            setShow(false);
                            setCategory(categ.name);
                            setSearchValue("");
                            setAllCategory(categories);
                          }}
                        >
                          {categ.name}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-col w-full gap-1">
                <label htmlFor="stock">Stock Quantity</label>
                <input
                  type="text"
                  name="stock"
                  id="stock"
                  placeholder="stock"
                  onChange={inputHandler}
                  value={product.stock}
                  className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                />
              </div>
            </div>

            <div className="flex flex-col mb-2 md:flex-row gap-3 w-full text-white">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Price"
                  onChange={inputHandler}
                  value={product.price}
                  className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                />
              </div>

              <div className="flex flex-col w-full gap-1">
                <label htmlFor="discount">Discount</label>
                <input
                  type="number"
                  name="discount"
                  id="discount"
                  placeholder="Discount"
                  onChange={inputHandler}
                  value={product.discount}
                  className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                />
              </div>
            </div>

            <div className="flex mb-4 flex-col w-full gap-1">
              <label htmlFor="description" className=" text-white">
                Description
              </label>
              <textarea
                type="text"
                name="description"
                id="description"
                placeholder="Product description"
                onChange={inputHandler}
                value={product.description}
                className="px-4 py-2 focus:border-[#4b535a] outline-none bg-[#E2DDDD] border border-slate-700 rounded-md text-[#333]"
                cols="10"
                rows="4"
              ></textarea>
            </div>

            <div className=" grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-white mb-4">
              {showImage &&
                showImage.length > 0 &&
                showImage.map((img, index) => (
                  <div className="h-[180px] relative" key={index}>
                    <label htmlFor={index}>
                      {imageLoader ? (
                        <div className="flex justify-center items-center h-full">
                          <FadeLoader />
                        </div>
                      ) : (
                        <img
                          src={img}
                          alt=""
                          className="w-full cursor-pointer h-full rounded-sm object-cover"
                        />
                      )}
                    </label>
                    <input
                      type="file"
                      id={index}
                      className="hidden"
                      onChange={(e) => handleChangeImage(img, e.target.files)}
                    />
                  </div>
                ))}
              <label
                htmlFor="image"
                className="flex justify-center items-center flex-col h-[180px] cursor-pointer border hover:border-red-300 w-full text-white "
              >
                <span>
                  <LuImagePlus size={30} />
                </span>
                <span>Select image</span>
              </label>
            </div>

            <div className="flex">
              <button
                disabled={loader}
                type="submit"
                // disabled={loader ? true : false}
                className="group relative w-[250px] h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-500 hover:bg-gray-600"
              >
                {loader ? (
                  <ScaleLoader color="#fff" height={22} width={5} radius={2} />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
