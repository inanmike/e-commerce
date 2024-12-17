import prismadb from '@/lib/prismadb'
import React from 'react'
import SizeForms from './components/sizeForms'


const SizePage = async ({params}: {params: {storeId: string}}) => {

  const size = await prismadb.size.findUnique({
    where:{
      id: params.storeId
    }
  })
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-5 p-8 pt-6">
        <SizeForms initialData={size}/>
      </div>
    </div>
  )
 }

export default SizePage