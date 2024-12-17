'use client'
import { Size } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import AlertModal from '@/components/modals/alert-modal'
import HeaderTitle from '@/components/HeaderTitle'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import axios from 'axios';
import toast from 'react-hot-toast'
import ImageUpload from '@/components/ImageUpload'

interface SizeFormsProps{
    initialData: Size | null
}

type SizeFormValues = z.infer<typeof formSchema>

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1)
})

export const SizeForms = ({initialData}:SizeFormsProps) => {

    const params = useParams()
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)



    const form = useForm<SizeFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: '',
        }
    })
    const title = initialData ? "Edit size" : "Create size"
    const description = initialData ? 'Edit a size' : 'Add a new size'
    const toastMessage = initialData ? 'Size Updated' : 'Size created'
    const buttonText = initialData ? "Save changes" : "Create"

const onSubmit = async (data: SizeFormValues) => {
    try {
        setLoading(true)
        if(initialData){
            await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data)
        }
        else{
            await axios.post(`/api/${params.storeId}/sizes`, data)
        }
        router.push(`/${params.storeId}/sizes`);
        router.refresh();
        toast.success(toastMessage);
    } catch (error) {
        toast.error("Something went wrong")
    }
    finally {
        setLoading(false)
    }
  }
  const onDelete = async () => {
    try {
        setLoading(true)
    } catch (error) {
        toast.error("Something went wrong")
    }
    finally {
        setLoading(false)
    }
  }
  return (
    <>
        <AlertModal
        isOpen={open}
        onClose={()=> setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
        />
        <div className="flex items-center justify-between">
            <div>
                <HeaderTitle title={title} description={description} />
                {initialData && (
                <Button
                disabled={loading}
                variant="destructive"
                size="sm"
                onClick={() => setOpen(true)}
                >
                <Trash className="h-4 w-4" />
                </Button>
            )}
            </div>
        </div>
        <Separator className="my-4" />

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>

                <div className="h-8"></div>
                
                <FormField control={form.control}
                name='value'
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                            <Input 
                            disabled={loading} 
                            placeholder='Enter Value' {...field}>
                            </Input>
                        </FormControl>
                        <FormMessage>

                        </FormMessage>
                    </FormItem>
                )}/>

                <FormField control={form.control}
                name='name'
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input 
                            disabled={loading} 
                            placeholder='Enter Name' {...field}>
                            </Input>
                        </FormControl>
                        <FormMessage>

                        </FormMessage>
                    </FormItem>
                )}/>

                <Button
                disabled={loading} 
                variant={"default"} 
                type='submit' 
                className='ml-auto mt-5'
                >
                {buttonText}
                </Button>
            </form>
        </Form>

        <Separator className="my-4" />
    </>
  )
}

export default SizeForms