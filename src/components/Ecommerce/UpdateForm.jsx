"use client"
import React, { useState } from "react";
import { ECOMM_URL } from "../../constants/apiCalls";
import axios from "axios";

const UpdateProductForm = ({ updateItem, onClose, productTypeData }) => {
  const [name, setName] = useState(updateItem.name);
  const [description, setDescription] = useState(updateItem.description);
  const [price, setPrice] = useState(updateItem.price);
  const [productType, setProductType] = useState(updateItem.productType);
  const [stock, setStock] = useState(updateItem.stock);
  const [loader,setLoader] = useState(false);

  const handleSubmit = async (id) => {
    try {
      setLoader(true)
      console.log(id, name, description, price, productType, stock);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_ECOMM_URL}/updateProduct`,
        {
          _id: id,
          name,
          description,
          price,
          productType,
          stock,
        },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      window.location.reload()
      setLoader(false)
    } catch (error) {
      console.log("there is error while sending request");
      setLoader(false)
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Product</h2>
      <div className="bg-white  rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="productType"
          >
            Product Type
          </label>
          <select
            className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="productType"
            value={productType}
            onChange={(e) => setProductType(e.target.value)}
            required
          >
            <option value="">Select Product Type</option>
            {productTypeData?.map((item, key) => (
              <option key={key} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="stock">
            Stock
          </label>
          <input
            className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="stock"
            type="text"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              handleSubmit(updateItem._id);
              onClose();
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
          {!loader?"Update":"Loading..."}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProductForm;
