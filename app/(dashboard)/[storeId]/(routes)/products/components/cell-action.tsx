'use client'
import React, { useState } from 'react' 
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
 
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProductColumn } from './columns'
import AlertModal from '@/components/modals/alert-modal'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'

interface CellActionProps{
    data: ProductColumn
}

const CellAction = ({data}:CellActionProps) => {

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const router = useRouter()
    const params = useParams()

    const onDelete = async() =>{
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/products/${data.id}`)
            toast.success('Product deleted')
            router.refresh()
        } catch (error) {
            toast.error('Something went wrong')
        }
        finally {
            setLoading(false)
            setOpen(false)
        }
    }
    const onCopy = (id: string) => {
        navigator.clipboard.writeText(id)
        toast.success('Product Copied Successfully')
    }
  return (
    <>
        <AlertModal
            isOpen={open}
            onClose={()=>setOpen(false)}
            onConfirm={onDelete}
            loading={loading}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={()=> onCopy(data.id)}
            >
              Copy Data ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={()=> router.push(`/${params.storeId}/products/${data.id}`)}>Update</DropdownMenuItem>
            <DropdownMenuItem onClick={()=> setOpen(true)}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
    </>
  )
}

export default CellAction