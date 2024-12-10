'use client'
import React, { useEffect, useState } from 'react'
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import { Button } from './ui/button';
import { ImagePlus, Trash } from 'lucide-react';

interface ImageUploadProps{
    disabled?: boolean
    onChange:(value: string) => void
    onRemove:(value: string) => void
    value:string[]
}

const ImageUpload = ({onChange, onRemove, value, disabled}:ImageUploadProps) => {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    },[])

    const onUpload = (result : any) => {
        onChange(result.info.secure_url)
    }

    if(!isMounted){
        return null
    }
  return (
    <div>
        <div className='mb-4 flex items-center gap-7'>
            {value.map((url)=>(
                <div key={url} className='relative w-64 h-64 rounded-x1 overflow-hidden'>
                    <div className='z-10 absolute top-2 right-1'>
                    <Button type='button'
                        disabled={disabled}
                        variant='secondary'
                        onClick={()=>onRemove(url)}
                    >
                        <Trash className='mr-1 h-2 w-2'></Trash>
                        Delete
                    </Button>
                    </div>
                    <Image fill className='object-cover' alt='Image' src={url}></Image>
                </div>
            ))}
        </div>
        <CldUploadWidget onUpload={onUpload} uploadPreset='gobhum7l'>
            {({open})=>{
                const onClick = () =>{
                    open()
                }
                return(
                    <Button type='button'
                        disabled={disabled}
                        variant='secondary'
                        onClick={onClick}
                    >
                        <ImagePlus className='mr-1 h-2 w-2'></ImagePlus>
                        Upload Images
                    </Button>
                )
            }}
        </CldUploadWidget>
    </div>
  )
}

export default ImageUpload