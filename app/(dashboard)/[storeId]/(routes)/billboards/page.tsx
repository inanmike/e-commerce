import React from 'react'
import BillboardClient from './components/BillboardClient'
import prismadb from '@/lib/prismadb'
import { BillboardColumn } from './components/columns'
import { format } from "date-fns";

const Billboard = async({params}: {params: {storeId: string}}) => {

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy:{
      createdAt: 'desc'
    }
  })

  const formattedBillboards : BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createAt: format(item.createdAt, 'yyyy-MM-dd hh:mm:ss'),
  }))

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-5 p-8 pt-6">
        <BillboardClient data={formattedBillboards}/>
      </div>
    </div>
  )
}

export default Billboard