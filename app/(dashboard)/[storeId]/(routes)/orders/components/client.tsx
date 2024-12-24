'use client'


import { DataTable } from '@/components/datatable'
import HeaderTitle from '@/components/HeaderTitle'
import { Separator } from '@/components/ui/separator'

import { OrderColumn, columns } from './columns'

interface OrderClientProps{
  data:OrderColumn[];
}

const OrderClient = ({data}: OrderClientProps) => {

  return (
    <>
      <div className="flex items-center justify-between">
              <HeaderTitle 
                title={`Orders ( ${data.length} )`} 
                description='Manage orders for your store'>  
              </HeaderTitle>
      </div>
      <Separator className='my-3'></Separator>
      <DataTable searchkey='label' data={data} columns={columns}/>
    </>
    
    
  )
}

export default OrderClient