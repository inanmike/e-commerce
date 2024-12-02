import { auth } from '@clerk/nextjs/server'
import React from 'react'
import { redirect } from 'next/navigation';
import prismadb from '@/lib/prismadb';
import SettingForms from './components/setting-for';

const Settings = async({params}: {params:{storeId:string}}) => {

  const {userId} = await auth();

  if (!userId){
    redirect('/sign-in');
  }

  const store = await prismadb.store.findFirst({
    where:{
      id: params.storeId,
      userId,
    }
  })

  if(!store){
    redirect('/')
  }
  return (
    <div className='flex-col'>
      <div className="flex-1 space-y-5 p-8 pt-6">
        <SettingForms initalData={store}></SettingForms>
      </div>
    </div>
  )
}

export default Settings