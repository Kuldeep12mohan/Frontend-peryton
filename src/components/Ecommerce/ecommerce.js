"use client"
import React, { useEffect, useState } from 'react';
import { ECOMM_URL, Category_url} from '@/constants/apiCalls';
import axios from 'axios'
import ProductCard from './ProductCard';
import UpdateProductForm from './UpdateForm';
import AddCategoryForm from './AddCategoryForm';
import UploadProductForm from './UploadProductForm';
import { MdOutlineCancel } from "react-icons/md";
import AddServiceForm from './AddServiceForm';
import Link from 'next/link';


function Ecommerce() {

  const [productType,setProductType]=useState([])
  const [allProducts,setAllProducts]=useState([])
  const [uploadProductForm,setUploadProductForm]=useState(false)
  const [updateProductForm,setUpdateProductForm]=useState(false)
  const [addServiceForm,setAddServiceForm]=useState(false)
  const [selectedItem, setSelectedItem] = useState(null);
  const [updateItem,setUpdateItem]=useState()
  const [addCategoryForm,setAddCategoryForm]=useState(false)
  const [type,setType]=useState("FPV Goggles")
  
  useEffect(()=>{

    const getAllProduct = async () => {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_ECOMM_URL}/getAllProducts`);
          if (res) {
            const data=res.data.data
            console.log(data)
            setAllProducts(data)
          }
        } catch (error) {
          console.error('Error while fetching Product types:', error);
        }
    };

    getAllProduct()
  },[])


  useEffect(()=>{
    const getProductType = async () => {
        try {
          console.log(process.env.NEXT_PUBLIC_Category_url)
          const res = await axios.get(`${process.env.NEXT_PUBLIC_Category_url}/getAllCategory`);
          if (res) {
            const data=res.data.data
            console.log(data)
            setProductType(data)
          }
        } catch (error) {
          console.error('Error while fetching Product types:', error);
        }
    };

    getProductType()
  },[])

const deleteCategory=async(id)=>{
    try {
        console.log(id)
        const res=await axios.delete(`${process.env.NEXT_PUBLIC_Category_url}/deleteCategory?_id=${id}`)
      if(res){
        window.location.reload();
      }
      } catch (error) {
        console.log(error,"not able to delte the product")
      }
}

  const handleClick=(item)=>{
    setType(item)
  }

  const handleButtonClick = (item) => {
    setSelectedItem(item);
  };

  const handleUploadForm = () => {
    setUploadProductForm(!uploadProductForm);
  };

  const handleUpdateForm = () => {
    setUpdateProductForm(!updateProductForm);
  };

  const handleCloseForm = () => {
    setSelectedItem(null);
  };

  const handleCategoryForm = () => {
    setAddCategoryForm(false);
  };

  const handleAddServiceForm = () => {
    setAddServiceForm(false);
  };


  return (
    <div className="flex flex-row h-[100vh]">
    <div className='w-[30vw] h-[100%] text-[2.5vw] sm:text-[1.75vw] md:text-[1.5vw] lg:text-[1.25vw] sm:w-[15vw] border-r-[1px] border-black flex flex-col items-center'>
        <div className="bg-black text-white text-xl tracking-wider font-semibold py-[0.75vw] px-[2vw] focus:outline-none w-full focus:shadow-outline">
            Category
        </div>
        <div className='w-full overflow-y-scroll max-h-[55%]'>
         {productType?.map((item,key)=>(
            <div 
            onClick={()=>handleClick(item.name)}
            key={key} 
            className={`py-[0.65vw] cursor-pointer border-b-[1px] border-black px-[1vw] font-medium ${type===item.name ? "bg-cyan-500 text-white scale-105 transition-all duration-200 ease-linear" : "bg-zinc-100 text-black"}`}>
                <div className='flex flex-row justify-between '>
                <div> {item.name}</div>
                <button 
                onClick={()=>deleteCategory(item._id)}
                className='text-red-500 hover:text-red-700'>
                   <MdOutlineCancel />
                </button>
                </div>
            
         </div>
        ))} 
    </div>

        <button
        onClick={()=>handleUploadForm()}
            className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-[0.75vw] px-[2vw] rounded focus:outline-none mt-[2vw] w-fit focus:shadow-outline"
            >
            Upload Product
        </button>

        <button
        onClick={()=>setAddCategoryForm(true)}
            className="bg-red-500 hover:bg-red-700 text-sm text-white font-bold py-[0.75vw] px-[2vw] rounded focus:outline-none mt-[0.5vw] w-fit focus:shadow-outline"
            >
            Add Category
        </button>

        <button
        onClick={()=>setAddServiceForm(true)}
            className="bg-red-500 hover:bg-red-700 text-sm text-white font-bold py-[0.75vw] px-[2vw] rounded focus:outline-none mt-[0.5vw] w-fit focus:shadow-outline"
            >
            Add Service
        </button>
        <Link 
      className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-[0.75vw] px-[2vw] rounded focus:outline-none mt-[0.5vw] w-fit focus:shadow-outline"
      href="/service">Service Page</Link>
        </div>
     

    <div className="flex p-[1vw] flex-wrap justify-center md:justify-start items-center md:items-start gap-[2vw] bg-zinc-700 w-[70vw] sm:w-[85vw] pl-[1.5vw]">
        {allProducts.filter((product)=>product.productType===type).map((item,key)=>(
            <div key={key}>
 <ProductCard item={item}  handleButtonClick={handleButtonClick} setUpdateItem={setUpdateItem} setUpdateProductForm={setUpdateProductForm}/>
            </div>
            
        ))}
    </div>
    

    {uploadProductForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <UploadProductForm item={selectedItem} onClose={handleUploadForm} productTypeData={productType} />
        </div>
      )}

    {updateProductForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <UpdateProductForm updateItem={updateItem} onClose={handleUpdateForm} productTypeData={productType} />
        </div>
      )}

    {addCategoryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <AddCategoryForm  onClose={handleCategoryForm} productTypeData={productType} />
        </div>
      )}

    {addServiceForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <AddServiceForm  onClose={handleAddServiceForm}  />
        </div>
      )}
     
    </div>
  );
}

export default Ecommerce;


