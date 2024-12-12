'use client'
import { Billboard } from '@prisma/client'
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

const formSchema = z.object({
    label: z.string().min(2),
    imageUrl: z.string().min(2)
})

type BillboardFormValues = z.infer<typeof formSchema>

interface BillboardFormsProps{
    initialData: Billboard | null
}

export const BillboardForms = ({initialData}:BillboardFormsProps) => {

    const params = useParams()
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)



    const form = useForm<BillboardFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            label: '',
            imageUrl: '',
        }
    })
    const title = initialData ? "Edit Billboard" : "Create Billboard"
    const description = initialData ? 'Edit a Billboard' : 'Add a new Billboard'
    const toastMessage = initialData ? 'Billboard Updated' : 'Billboard Created'
    const buttonText = initialData ? "Save Changes" : "Create"

const onSubmit = async (data: BillboardFormValues) => {
    try {
        setLoading(true)
        if(initialData){
            await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, data)
        }
        else{
            await axios.post(`/api/${params.storeId}/billboards`, data)
        }
        router.push(`/${params.storeId}/billboards`);
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

            <FormField control={form.control}
                name='imageUrl'
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Background Image</FormLabel>
                        <FormControl>
                            <ImageUpload
                            value={field.value ? [field.value]: []}
                            disabled={loading}
                            onChange={(url) =>field.onChange(url)}
                            onRemove={() => field.onChange("")}
                            >

                            </ImageUpload>
                        </FormControl>
                        <FormMessage>

                        </FormMessage>
                    </FormItem>
                )}/>

                <div className="h-8"></div>
                
                <FormField control={form.control}
                name='label'
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Label</FormLabel>
                        <FormControl>
                            <Input 
                            disabled={loading} 
                            placeholder='Billboard' {...field}>
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

export default BillboardForms