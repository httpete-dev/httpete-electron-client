'use client'
import Image from "next/image"
import { ChevronDown, Code, File, Globe, LogOut, LogOutIcon, Menu, Settings, User, Users } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { Button } from "../ui/button"
import React, { useEffect, useState } from "react"
import { Workspace } from "@/model"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"
import { Input } from "../ui/input"
import Loading from "../animated/Loading"
import { createNewWorkspace } from "@/server/workspaces"
import { DashboardBtnLarge } from "./DashboardBtnLarge"
import { DashboardDropdownLarge } from "./DashboardDropdownLarge"

type HeaderProps = {
    title: string,
    isMobile: boolean,
    activeWorkspace?: Workspace,
    setActiveWorkspace?: (ws: number) => void;
    workspaces?: Workspace[],
}

const menuEntries = [
    // { title: 'Code', icon: <Code className="w-5 h-5 text-white" />, path: '/dashboard/code' },
    { title: 'API', icon: <Globe className="w-5 h-5 text-white" />, path: '/dashboard/api-client' },
    { title: 'Documentation', icon: <File className="w-5 h-5 text-white" />, path: '/dashboard/docs' },
    { title: 'Community', icon: <Users className="w-6 h-6 text-white" />, path: '/dashboard/community' },
    { title: 'Settings', icon: <Settings className="w-5 h-5 text-white" />, path: '/settings' },
    // { title: 'Sign out', icon: <LogOutIcon className="w-6 h-6 text-white" />, path: '/sign-out' }
]

const Navbar = (props: HeaderProps) => {
    const router = useRouter()
    
    const [workspaces, setWorkspaces] = useState([] as Workspace[])
    const [activeWorkspace, setActiveWorkspace] = useState({} as Workspace)
    const [pageLoading, setPageLoading] = useState('');
    const [activePage, setActivePage] = useState('');
    // useEffect(() => {
    //     setWorkspaces(session?.user?.workspaces ?? [])
    //     setActiveWorkspace(session?.user?.activeWorkspace ?? {} as Workspace)
    // }, [session])
   
    return (
        <header className="bg-gray-800 py-0 sticky w-full border-b-2 border-red-400 shadow-lg">
            <div className="w-full px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="w-12 flex items-center">
                    <Image src="https://utfs.io/f/5VzIfIO6yTtGnHrN3BtGQJcDXfzP96NBie4G3S2vqupKLw58" alt="HttPete Logo" width={40} height={40} className="mr-4" />
                </div>
                <div className="flex mr-auto">
                    {props.isMobile ?
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost">
                                    <Menu className="text-white bg-slate-600 rounded-3xl" style={{ width: '40px', height: '40px', padding: '5px' }} />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-gray-700 text-white border-none shadow-[0_0_10px_rgba(255,127,80,0.5)]">
                                {menuEntries.map(x =>
                                    <DropdownMenuEntry key={x.title} title={x.title} icon={x.icon} path={x.path} />
                                )}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        :
                        <div className="w-full flex flex-wrap gap-0">
                            <div className="mt-0" style={{ height: '60px', padding: '5px' }}>
                                {props.title !== 'Settings' && props.title !== 'Community' &&
                                    <DashboardDropdownLarge
                                        title="APIs Interface"
                                        path="/dashboard"
                                        icon={<Globe className="w-6 h-6 text-white" />} 
                                        workspaces={[]} activeWorkspace={0} />}
                            </div>
                            <div className="absolute right-0 flex flex-row p-2">
                                <div className="flex flex-row gap-2" style={{ height: '45px', padding: '5px' }}>
                                    {menuEntries.map(x =>
                                        <DashboardBtnLarge activePage={activePage} setActivePage={setActivePage} key={x.title} title={x.title} path={x.path} icon={x.icon} />
                                    )}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size={'icon'} className="hover:bg-transparent bg-transparent ml-2">
                                                <Avatar className="bg-slate-300 text-slate-800">
                                                    {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                                                    <AvatarFallback><b className="text-3xl text-gray-600">?</b></AvatarFallback>
                                                </Avatar>
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="mr-12 mt-8 scale-125 bg-slate-800 border-2 text-white">
                                            <DropdownMenuItem>
                                                <User className="mr-2 h-4 w-4" />
                                                <span>
                                                    Profile
                                                </span>
                                            </DropdownMenuItem>
                                            {/* <DropdownMenuSeparator /> */}
                                            <DropdownMenuItem>
                                                <Settings className="mr-2 h-4 w-4" />
                                                <span>
                                                    Settings
                                                </span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => /* signOut({ callbackUrl: '/' } */{ return; }}>
                                                <LogOut className="mr-2 h-4 w-4" />
                                                <span>Log out</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </header>
    )
}

export default Navbar;

type DropdownMenuEntryProps = {
    title: string,
    icon: React.ReactNode,
    path: string
}
export const DropdownMenuEntry = (props: DropdownMenuEntryProps) => {
    const currentPath = usePathname();
    const router = useRouter();

    return (
        <DropdownMenuItem onClick={() => {
            if (props.title === 'Sign out') {
                // signOut({ callbackUrl: '/' })
                return;
            }

            router.push(props.path)
        }
        }>
            <div className={'rounded-sm w-full flex p-2' + (currentPath === props.path ? ' bg-red-400' : ' bg-slate-600')}>
                {props.icon}
                <span className="px-2">
                    {props.title}
                </span>
            </div>
        </DropdownMenuItem>
    )
}
