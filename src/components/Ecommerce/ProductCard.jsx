"use client"
import React from "react";
import axios from 'axios'
import { ECOMM_URL } from "../../constants/apiCalls";

const ProductCard = ({
  item,
  handleButtonClick,
  setUpdateItem,
  setUpdateProductForm,
}) => {

  const deleteProduct=async(id)=>{
    try {
      console.log(id)
      const res=await axios.delete(`${process.env.NEXT_PUBLIC_ECOMM_URL}/deleteProduct?_id=${id}`)
    if(res){
      window.location.reload();
    }
    } catch (error) {
      console.log(error,"not able to delte the product")
    }
  }
  return (
    <div
      
      className="container page-wrapper w-[85%] sm:w-[40vw] lg:w-[26vw] xl:w-[19vw]"
    >
      <div className="page-inner ">
        <div className="row ">
          <div className=" w-[100%]  bg-white el-wrapper">
            <div className="box-up">
              <img className="img" src={item.imageUrls} alt="" />
              <div className="img-info">
                <div className="info-inner">
                  <span className="p-name">{item.name}</span>
                  {/* <span className="p-company">Yeezy</span> */}
                </div>
                <div className="a-size">
                  Stock : <span className="size">{item.stock}</span>
                </div>
              </div>
            </div>

            <div className="box-down">
              <div className="h-bg">
                <div className="h-bg-inner"></div>
              </div>

              <a
                onClick={() => handleButtonClick(item.name)}
                className="cart"
                href="#"
              >
                <span className="price ">${item.price}</span>
                <span className="add-to-cart">
                  <span className="txt">Buy Now</span>
                </span>
              </a>
            </div>
          </div>
          <div className="flex flex-row justify-around">
            <button
              onClick={() => {
                setUpdateItem(item);
                setUpdateProductForm(true);
              }}
              className="bg-blue-500 hover:bg-blue-700 text-[2vw] md:text-[1vw] text-white font-bold py-[0.5vw] px-[1vw]  focus:outline-none w-1/2 focus:shadow-outline"
              type="submit"
            >
              Edit
            </button>
            <button
              onClick={() => {
                deleteProduct(item._id)
              }}
              className="bg-red-500 hover:bg-red-700 text-[2vw] md:text-[1vw] text-white font-bold py-[0.5vw] px-[1vw]  focus:outline-none w-1/2 focus:shadow-outline"
              type="submit"
            >
              Delete 
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
