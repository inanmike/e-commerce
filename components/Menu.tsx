'use client'
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

const Menu = () => {

    const pathname = usePathname();
    const params = useParams();

    const routes = [
        {
            href: `/${params.storeId}/settings`,
            label: "Settings",
            active: pathname === `/${params.storeId}/settings`
        },
        {
            href: `/${params.storeId}/bilboard`,
            label: "Bilboard",
            active: pathname === `/${params.storeId}/bilboard`
        }
    ]
  return (
    <nav className='mx-4 flex items-center space-x-4'>
        {routes.map((route) =>(
            <Link
                key={route.href}
                href={route.href}
                className={cn(
                    'text-sm font-medium text-slate-500 hover:text-slate-800',
                    route.active? "text-red-800" : ""
                )}
            >
                {route.label}
            </Link>
        ))}
    </nav>
  )
}

export default Menu