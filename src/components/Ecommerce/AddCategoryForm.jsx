"use client";
import React, { useState } from "react";
import axios from "axios";

const AddCategoryForm = ({ onClose }) => {
  const [name, setName] = useState("");
  const [loader,setLoader] = useState(false);

  const handleSubmit = async () => {
    try {
      setLoader(true)
      await axios.post(
        `${process.env.NEXT_PUBLIC_Category_url}/addCategory`,
        { name },
        {
          headers: {
            Accept: "application/json",
          },
        }
      );
      console.log("add category");
      window.location.reload()
      setLoader(false)
    } catch (error) {
      console.log("there is error while sending request");
      setLoader(false)
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white h-fit ">
      <h2 className="text-2xl font-bold mb-4 text-center">Upload Product</h2>
      <div className="bg-white rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight "
            id="name"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={() => handleSubmit()}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {!loader?"Add":"Loading..."}
          </button>
          <button
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

export default AddCategoryForm;
