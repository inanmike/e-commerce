import prismadb from '@/lib/prismadb'
import React from 'react'
import CategoryForms from './components/CategoryForms'



const CategoryPage = async ({params}: {params: {storeId: string, categoryId: string}}) => {

  const category = await prismadb.category.findUnique({
    where:{
      id: params.storeId
    }
  })

  const billboards = await prismadb.billboard.findMany({
    where:{
      storeId: params.storeId
    }
  })
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-5 p-8 pt-6">
        <CategoryForms initialData={category} billboards={billboards}/>
      </div>
    </div>
  )
 }

export default CategoryPage