
import React from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import Ecommerce from '@/components/Ecommerce/ecommerce'

const page = () => {
  return (
    <ProtectedRoute>
         <Ecommerce/>
    </ProtectedRoute>
  )
}

export default page