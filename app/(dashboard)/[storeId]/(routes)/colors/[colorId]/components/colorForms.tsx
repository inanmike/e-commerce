'use client'
import { Color } from '@prisma/client'
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

interface ColorFormsProps{
    initialData: Color | null
}

type ColorFormValues = z.infer<typeof formSchema>

const formSchema = z.object({
    name: z.string().min(2),
    value: z.string().min(4).regex(/^#/, {
        message: "Color value must be a valid hex color code starting with '#' (e.g., #FF0000)"
    })
})

export const ColorForms = ({initialData}:ColorFormsProps) => {

    const params = useParams()
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)



    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: '',
        }
    })
    const title = initialData ? "Edit color" : "Create color"
    const description = initialData ? 'Edit a color' : 'Add a new color'
    const toastMessage = initialData ? 'color Updated' : 'color Created'
    const buttonText = initialData ? "Save Changes" : "Create"

const onSubmit = async (data: ColorFormValues) => {
    try {
        setLoading(true)
        if(initialData){
            await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data)
        }
        else{
            await axios.post(`/api/${params.storeId}/colors`, data)
        }
        router.push(`/${params.storeId}/colors`);
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

export default ColorForms