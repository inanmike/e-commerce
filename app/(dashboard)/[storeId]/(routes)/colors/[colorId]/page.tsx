import prismadb from '@/lib/prismadb'
import React from 'react'
import BillboardForms from './components/BillboardForms'


const BillboardPage = async ({params}: {params: {storeId: string}}) => {

  const billboards = await prismadb.billboard.findUnique({
    where:{
      id: params.storeId
    }
  })
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-5 p-8 pt-6">
        <BillboardForms initialData={billboards}/>
      </div>
    </div>
  )
 }

export default BillboardPage