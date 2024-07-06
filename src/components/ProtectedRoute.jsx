"use client"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const ProtectedRoute = ({children}) => {
    const [isAuthenticated ,setIsAuthenticated]=useState(false)
    const router=useRouter();
    useEffect(()=>{
        const storedPassword=localStorage.getItem('password')
        if(storedPassword==="Peryton@12345"){
            setIsAuthenticated(true);
        } else{
            router.push("/")
        }
    })

  return isAuthenticated && (
    children
  ) 
}

export default ProtectedRoute