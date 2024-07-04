
import React from 'react'
import ProtectedRoute from '@/components/ProtectedRoute'
import Ecommerce from '@/components/Ecommerce/ecommerce'
import Services from '@/components/services/Services'

const page = () => {
  return (
    <ProtectedRoute>
       <Services/>
    </ProtectedRoute>
  )
}

export default page