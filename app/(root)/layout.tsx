import React from 'react'
import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

interface LayoutRootProps{
    children: React.ReactNode
}

const LayoutRoot = async ({children}:LayoutRootProps) => {

    const {userId} = await auth();
    console.log(userId) // BURAYA BAK 
    if(!userId){
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId,
        },
    })

    if(store){
        redirect(`/${store.id}`)
    }
  return (
    <div>
        {children}
    </div>
  )
}

export default LayoutRoot