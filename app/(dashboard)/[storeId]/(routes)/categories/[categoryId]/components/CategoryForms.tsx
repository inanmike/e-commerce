'use client'
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
import { Billboard, Category } from '@prisma/client'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

const formSchema = z.object({
    name: z.string().min(2),
    billboardId: z.string().min(2)
})

type CategoryFormValues = z.infer<typeof formSchema>

interface CategoryFormsProps{
    initialData: Category | null
    billboards : Billboard[]
}

export const CategoryForms = ({initialData, billboards}:CategoryFormsProps) => {

    const params = useParams()
    const router = useRouter()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)



    const form = useForm<CategoryFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            billboardId: '',
        }
    })
    const title = initialData ? "Edit Category" : "Create Category"
    const description = initialData ? 'Edit a Category' : 'Add a new Category'
    const toastMessage = initialData ? 'Category Updated' : 'Category Created'
    const buttonText = initialData ? "Save Changes" : "Create"

const onSubmit = async (data: CategoryFormValues) => {
    try {
        setLoading(true)
        if(initialData){
            await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, data)
        }
        else{
            await axios.post(`/api/${params.storeId}/categories`, data)
        }
        router.push(`/${params.storeId}/categories`);
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
                name='name'
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input 
                            disabled={loading} 
                            placeholder='Name' {...field}>
                            </Input>
                        </FormControl>
                        <FormMessage>

                        </FormMessage>
                    </FormItem>
                )}/>

                <FormField control={form.control}
                name='billboardId'
                render={({field})=>(
                    <FormItem>
                        <FormLabel>Billboard</FormLabel>
                        <Select 
                            disabled={loading} 
                            onValueChange={field.onChange} 
                            value={field.value} 
                            defaultValue={field.value}>
                            <SelectTrigger className="w-full">
                                <SelectValue defaultValue={field.value} placeholder="Select a Billboard" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {billboards.map((billboard)=> (
                                        <SelectItem key={billboard.id} value={billboard.id}>
                                            {billboard.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <FormMessage/>
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

export default CategoryForms