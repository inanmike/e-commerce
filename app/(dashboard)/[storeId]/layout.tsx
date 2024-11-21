import React from 'react'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'

interface LayoutStoreIdProps{
    children: React.ReactNode
}

const StoreId = async ({children}:LayoutStoreIdProps) => {

    const {userId} = await auth();
    console.log(userId) // BURAYA BAK 
    if(!userId){
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId,
        }
    })

    if(!store){
        redirect('/')
    }
  return (
    <div>
        <Navbar/> 
        {children}
    </div>
  )
}

export default StoreId