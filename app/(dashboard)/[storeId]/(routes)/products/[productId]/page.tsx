import prismadb from '@/lib/prismadb'
import React from 'react'
import ProductForms from './components/ProductForm'



const ProductPage = async ({params}: {params: {storeId: string, productId: string}}) => {

  const product = await prismadb.product.findUnique({
    where:{
      id: params.storeId
    },
    include: {
      images: true,
    }
  })

  const categories = await prismadb.category.findMany({
    where:{
      storeId: params.storeId
    }
  })

  const sizes = await prismadb.size.findMany({
    where:{
      storeId: params.storeId
    }
  })

  const colors = await prismadb.color.findMany({
    where:{
      storeId: params.storeId
    }
  })
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-5 p-8 pt-6">
        <ProductForms 
          categories={categories}
          colors={colors}
          sizes={sizes}
          initialData={product}/>
      </div>
    </div>
  )
 }

export default ProductPage