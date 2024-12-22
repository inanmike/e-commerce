'use client'

import ApiList from '@/components/ApiList'
import { DataTable } from '@/components/datatable'
import HeaderTitle from '@/components/HeaderTitle'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import React, { useState } from 'react'
import { CategoryColumn , columns} from './column'

interface CategoryClientProps{
  data:CategoryColumn[];
}

const CategoryClient = ({data}: CategoryClientProps) => {
    const params = useParams()
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

  return (
    <>
      <div className="flex items-center justify-between">
              <HeaderTitle title={`Category ( ${data.length} )`} description='Manage Category Panel'></HeaderTitle>
              <Button disabled={loading} 
              variant="default" 
              size="sm" 
              onClick={()=>router.push(`/${params.storeId}/categories/new`)}
              >
                  <Plus className='h-4 w-4 mr-2'/>
                  Add Category
              </Button>
      </div>
      <Separator className='my-3'></Separator>
      <DataTable searchkey='name' data={data} columns={columns}/>
      <ApiList name='categories' Idname='categoryId'/>
    </>
    
    
  )
}

export default CategoryClient