'use client'
import React, { useState} from 'react'
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
  import {
    Calculator,
    Calendar,
    CreditCard,
    Settings,
    Smile,
    User,
    Store,
    ChevronDown,
    Check
  } from "lucide-react"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { useStoremodal } from '@/hooks/use-store-modal';
import { useRouter, useParams } from 'next/navigation';
import { Button } from './ui/button'
import { cn } from '@/lib/utils'


  type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

  interface StoreSwitcherProps extends PopoverTriggerProps{
    items: Record<string, any>[];
  }
  
const StoreSwitcher = ({items}: StoreSwitcherProps) => {

    const storeModal = useStoremodal();
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const formatedItems = items.map((item) => ({
        label: item.name,
        value: item.id
    }))
    const currentStore = formatedItems.find((item) => item.value === params.storeId)

    const onStoreSelect = (store: {value: string, label: string}) => {
      setOpen(false);
      router.push(`/${store.value}`);
    }

  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
                variant="outline" size="sm" role='combobox' aria-expanded={open} aria-label='Select a Store'
                className='w-45'
            >
              <Store className='h-4 w-4'/>
              {currentStore?.label}
              <ChevronDown className='ml-auto h-4 w-4'/>
            </Button>
        </PopoverTrigger>
        <PopoverContent>
        <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Stores">

          {formatedItems.map((store) => (
            <CommandItem key={store.value} onSelect={()=>onStoreSelect(store)}>
              <span>{store.label}</span>
              <Check className={cn(
                "ml-auto",
                currentStore?.value === store.value
                ? "opacity-100"
                : "opacity-0"
              )}/>
          </CommandItem>
          ))}

        </CommandGroup>
        <CommandSeparator />

          <CommandGroup>
            <CommandItem onSelect={()=>{
              setOpen(false)
              storeModal.onOpen()
            }}>
              <span>New Store</span>
            </CommandItem>
          </CommandGroup>

      </CommandList>
    </Command>
        </PopoverContent>
    </Popover>

  )
}

export default StoreSwitcher