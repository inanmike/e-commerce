import React from 'react'
import prismadb from '@/lib/prismadb'
import { formatter } from '@/lib/utils';
import { ProductColumn } from './components/columns'

import { format } from "date-fns";
import ProductClient from './components/ProductClient';


const ProductsPage = async({params}: {params: {storeId: string}}) => {

  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId
    },
      include: {
        category: true,
        size: true,
        color: true,
      },
    orderBy:{
      createAt: 'desc'
    }
  })

  const formattedProducts : ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price),
    category: item.category.name,
    size: item.category.name,
    color: item.color.value,
    createAt: format(item.createAt, 'yyyy-MM-dd hh:mm:ss'),
  }))

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-5 p-8 pt-6">
        <ProductClient data={formattedProducts}/>
      </div>
    </div>
  )
}

export default ProductsPage