'use client'
import React, { useState } from 'react'
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
  } from "lucide-react"
  import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { useStoremodal } from '@/hooks/use-store-modal';
import { useRouter, useParams } from 'next/navigation';
import { Button } from './ui/button'

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
  return (
    <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
                variant="outline" size="sm" role='combobox' aria-expanded={open} aria-label='Select a Store'
                className='w-15 md:w-20 lg:w-35'
            >
                {currentStore?.label}
            </Button>
        </PopoverTrigger>
        <PopoverContent>
        <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Smile />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem disabled>
            <Calculator />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
        </PopoverContent>
    </Popover>

  )
}

export default StoreSwitcher