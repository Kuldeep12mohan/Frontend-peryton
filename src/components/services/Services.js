"use client"
import React, { useState,useEffect } from "react";
import Glassy from "./Glassy";
import axios from 'axios'
import { service_url } from "../../constants/apiCalls";
import StyledHeading from "./styledHeading";
import Link from "next/link";


const Services = () => {
 

  const [selectedItem ,setSelectedItem]=useState("")
  const [active ,setActive]=useState(false)
  const [allServices, setAllServices] = useState([])

  const handleDelete=async(id)=>{
    try {
      console.log(id)
      const res=await axios.delete(`${process.env.NEXT_PUBLIC_service_url}/deleteService?_id=${id}`)
    if(res){
      window.location.reload();
    }
    } catch (error) {
      console.log(error,"not able to delte the Service")
    }
  }

  useEffect(()=>{

   const getAllService = async () => {
        try {
          const res = await axios.get(`${process.env.NEXT_PUBLIC_service_url}/getAllServices`);
            const data=res.data.data
            console.log(data)
            setAllServices(data)
        } catch (error) {
          console.error('Error while fetching Service types:', error);
        }
    };

    getAllService()
  },[])

  const itemName=(name)=>{
    console.log(name)
    setSelectedItem(name)
  }

  const handleCloseForm = () => {
    setActive(!active)
  };

  return (
    <div className="bg-gray-950 w-full min-h-[100vh] py-8 pb-32 overflow-hidden">
      <Link 
      className="bg-white md:text-2xl text-xl ml-[5vw] py-[0.5vw] px-[1.5vw] rounded-sm md:rounded-lg"
      href="/admin">Admin</Link>
        <StyledHeading bg_text="Services" fg_text="Services" />
      <div className="flex md:flex-row flex-col flex-wrap justify-center gap-10 pt-[5vw] items-center rounded-md shadow-md">
          {allServices?.map((item,index) => (
            <div key={index} >
              <Glassy 
              icon={item.imageUrls} 
              name={item.name} 
              servicePage={true}
              handleClick={handleCloseForm} 
              itemName={itemName} 
              id={item._id} 
              handleDelete={handleDelete}
              homePage={false}/> 
              </div>
          ))}
        </div>
        
    </div>
  );
};

export default Services;
