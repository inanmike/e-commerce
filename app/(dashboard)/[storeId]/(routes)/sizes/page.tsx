import React from 'react'

import prismadb from '@/lib/prismadb'
import { SizeColumn } from './components/columns'
import { format } from "date-fns";
import SizeClient from './components/SizeClient';

const SizesPage = async({params}: {params: { storeId: string}}) => {

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy:{
      createAt: 'desc'
    }
  })

  const formattedSizes : SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createAt: format(item.createAt, 'yyyy-MM-dd hh:mm:ss'),
  }))

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-5 p-8 pt-6">
        <SizeClient data={formattedSizes}/>
      </div>
    </div>
  )
}

export default SizesPage