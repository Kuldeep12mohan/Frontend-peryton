"use client"
import React from 'react'
import { useState } from 'react';
import { service_url } from '@/constants/apiCalls';
import axios from 'axios';

const AddServiceForm = ({onClose}) => {

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loader,setLoader] = useState(false);
  const [disabled,setDisabled] = useState(true);


    const handleSubmit =async () => {
        try {
          setLoader(true);
          console.log( 
            name,
            description,
            imageFile
          )
    
          const res = await axios.post(`${process.env.NEXT_PUBLIC_service_url}/addService`, {
            name,
            description,
            imageUrls:imageFile
          }, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
  
          
        });
        window.location.reload()
        setLoader(false)
    
        } catch (error) {
          console.log("there is error while sending request")
          setLoader(false)
        }
      };


    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
        setDisabled(false)
      };

    return (
        <div className="max-w-md mx-auto bg-white h-fit ">
          <h2 className="text-2xl font-bold mb-4 text-center">Upload Product</h2>
          <div  className="bg-white rounded px-8 pt-6 pb-8 mb-4">
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

            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="description">
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
              <label className="block text-gray-700 font-bold mb-2" htmlFor="imageFile">
                Image
              </label>
              <input
                className=" border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                required
              />
            </div>
           

            <div className="flex items-center justify-between">
              <button
              onClick={()=>handleSubmit()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {loader?"Loading...":"Add Service"}
              </button>
              <button
              type="button"
              disabled={disabled}
              onClick={onClose}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-300"
            >
              Cancel
            </button>
            </div>
          </div>
        </div>
      );
}

export default AddServiceForm