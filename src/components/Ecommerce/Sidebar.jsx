"use client"
import React from 'react'

const Sidebar = ({productType,setType,type}) => {

    const handleClick=(item)=>{
        setType(item)
        console.log(item,"clicked")
    }

  return (
    <div className='w-[15vw] border-r-[1px] h-[100vh] border-black bg-yellow-200'>
         {productType?.map((item,key)=>(
            <div 
            onClick={handleClick(item)}
            key={key} 
            className='py-[0.75vw] cursor-pointer border-b-[1px] border-black px-[2vw] font-medium'>
             {item}
         </div>
        ))} 
        
       
    </div>
  )
}

export default Sidebar