import React from 'react'

import prismadb from '@/lib/prismadb'
import { ColorColumn } from './components/columns'
import { format } from "date-fns";
import ColorClient from './components/ColorClient';

const ColorsPage = async({params}: {params: { storeId: string}}) => {

  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy:{
      createAt: 'desc'
    }
  })

  const formattedColors : ColorColumn[] = colors.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createAt: format(item.createAt, 'yyyy-MM-dd hh:mm:ss'),
  }))

  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-5 p-8 pt-6">
        <ColorClient data={formattedColors}/>
      </div>
    </div>
  )
}

export default ColorsPage