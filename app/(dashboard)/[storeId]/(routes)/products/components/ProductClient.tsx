'use client'

import ApiList from '@/components/ApiList'
import { DataTable } from '@/components/datatable'
import HeaderTitle from '@/components/HeaderTitle'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import React, { useState } from 'react'
import { ProductColumn, columns } from './columns'

interface ProductClientProps{
  data:ProductColumn[];
}

const ProductClient = ({data}: ProductClientProps) => {
    const params = useParams()
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between">
              <HeaderTitle title={`Products ( ${data.length} )`} description='Manage Product Panel'></HeaderTitle>
              <Button disabled={loading} 
              variant="default" 
              size="sm" 
              onClick={()=>router.push(`/${params.storeId}/products/new`)}
              >
                  <Plus className='h-4 w-4 mr-2'/>
                  Add Product
              </Button>
      </div>
      <Separator className='my-3'></Separator>
      <DataTable searchkey='label' data={data} columns={columns}/>
      <ApiList name='products' Idname='productId'/>
    </>
    
    
  )
}

export default ProductClient