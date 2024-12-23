import prismadb from '@/lib/prismadb'
import React from 'react'
import ColorForms from './components/colorForms'


const ColorPage = async ({params}: {params: {storeId: string}}) => {

  const color = await prismadb.color.findUnique({
    where:{
      id: params.storeId
    }
  })
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-5 p-8 pt-6">
        <ColorForms initialData={color}/>
      </div>
    </div>
  )
 }

export default ColorPage