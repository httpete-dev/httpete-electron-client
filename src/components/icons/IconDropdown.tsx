'use client'

import { EllipsisVertical } from 'lucide-react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

type CollectionDropdownProps = {
    deleteCollection: () => void;
    addEndpoint: () => void;
}

type IconDropdownProps = {
    options: DropdownOption[];
    showOnHover?: boolean;
}

type DropdownOption = {
    name: string;
    onClick: () => void;
}

export const IconDropdown = (props: IconDropdownProps) => {
    const handleSelect = (option: DropdownOption) => {
        props.options.find(x => x === option)?.onClick();
    }

    return (
        <div className='group'>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-fit w-8 p-0 hover:bg-transparent">
                    <EllipsisVertical className={"cursor-pointer " + (props.showOnHover ? 'group-hover:block hidden max-w-3' : '')} />
                    <span className="sr-only">Open menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className='bg-slate-500 border-gray-600 text-gray-200'>
                {props.options.map((option) => (
                    <DropdownMenuItem
                    key={option.name}
                    onClick={() => handleSelect(option)}
                    className='cursor-pointer hover:bg-gray-700'
                    >
                        {option.name}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
                </div>
    )
}

export default function CollectionDropdown(props: CollectionDropdownProps) {
    
    const options = [
        { name: 'Edit Collection',  onClick: () => {} } as DropdownOption,
        { name: 'Add Endpoint', onClick: props.addEndpoint } as DropdownOption,
        { name: 'Delete Collection', onClick: props.deleteCollection} as DropdownOption
    ];

    return <IconDropdown options={options}/>
}

type EndpointDropdownProps = {
    deleteEndpoint: () => void;
}

export function EndpointDropdown(props: EndpointDropdownProps) { 
    
    const options = [
        { name: 'Edit Endpoint',  onClick: () => {} } as DropdownOption,
        { name: 'Delete Endpoint', onClick: props.deleteEndpoint} as DropdownOption
    ];

    return <IconDropdown options={options} showOnHover={true}/>
}
