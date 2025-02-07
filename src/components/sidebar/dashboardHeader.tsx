'use client'
import Image from "next/image"
import { ChevronDown, Code, File, Globe, LogOut, LogOutIcon, Menu, Settings, User, Users } from "lucide-react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { Workspace } from "@/model"
import { createNewWorkspace } from "@/server/workspaces"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { DropdownMenuItem, DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@radix-ui/react-dropdown-menu"
import Loading from "../Loading"
import { Button } from "../ui/button"
import { DialogHeader, DialogFooter } from "../ui/dialog"
import { Input } from "../ui/input"

type HeaderProps = {
    title: string,
    isMobile: boolean,
    activeWorkspace?: Workspace,
    setActiveWorkspace?: (ws: number) => void;
    workspaces?: Workspace[],
}
// <DropdownMenuEntry title='API Interface' icon={} path='/dashboard' />
// <DropdownMenuEntry title='Documentation' icon={<File className="w-6 h-6 text-white" />} path='/dashboard/docs' />
// <DropdownMenuEntry title='Profile' icon={<User className="w-6 h-6 text-white" />} path='/profile' />
// <DropdownMenuEntry title='Settings' icon={<Settings className="w-6 h-6 text-white" />} path='/settings' />
// <DropdownMenuEntry title='Sign out' icon={<LogOutIcon className="w-6 h-6 text-white" />} path='/settings' />
const menuEntries = [
    // { title: 'Code', icon: <Code className="w-5 h-5 text-white" />, path: '/dashboard/code' },
    { title: 'API', icon: <Globe className="w-5 h-5 text-white" />, path: '/dashboard' },
    { title: 'Documentation', icon: <File className="w-5 h-5 text-white" />, path: '/dashboard/docs' },
    { title: 'Community', icon: <Users className="w-6 h-6 text-white" />, path: '/dashboard/community' },
    { title: 'Settings', icon: <Settings className="w-5 h-5 text-white" />, path: '/settings' },
    // { title: 'Sign out', icon: <LogOutIcon className="w-6 h-6 text-white" />, path: '/sign-out' }
]

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

type DashboardDropdownLargeProps = {
    title: string,
    icon: React.ReactNode,
    path: string,
    workspaces: Workspace[],
    activeWorkspace: number
}

type DashboardBtnLargeProps = {
    path: string,
    icon: React.ReactNode,
    title: string,
}

export const DashboardDropdownLarge = (props: DashboardDropdownLargeProps) => {
    const router = useRouter();
    const path = usePathname();
    const isActive = path === props.path;
    const [activeWorkspace, setActiveWorkspace] = useState({ id: 0 } as Workspace)
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newWorkspaceName, setNewWorkspaceName] = useState('');
    const [workspaceTitle, setWorkspaceTitle] = useState(session?.user.activeWorkspace?.title ?? 'Personal Workspace');

    const handleDialogConfirm = () => {
        const userId = -1; // FIXME: Get user id from session
        if (userId === -1) {
            return;
        }

        const created = createNewWorkspace({ userId: userId, wsName: newWorkspaceName })
    };

    const searchParams = useSearchParams();

    const handleDialogCancel = () => {
        setIsDialogOpen(false);
    };
    useEffect(() => {
        const wsId = searchParams.get('ws');
        const selectedWorkspace = props.workspaces?.find(x => x?.id === (wsId ? parseInt(wsId) : -1)) ?? { id: -1 } as Workspace;
        setActiveWorkspace(selectedWorkspace);
        setWorkspaceTitle(props.workspaces?.find(x => x?.id === selectedWorkspace.id)?.title ?? 'Personal Workspace');
    }, [searchParams, props.workspaces])
    return <div className="flex flex-row">
        {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={"flex text-white p-3 hover:bg-transparent hover:underline transition duration-300"}>
                    <span style={{ marginLeft: '0rem' }}>
                        {workspaceTitle}
                    </span>
                    <ChevronDown width={32} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ backgroundColor: '#ffffff32' }} className="text-white space-y-2 border-none">
                <DropdownMenu>
                    <DropdownMenuTrigger>{props.workspaces?.find(x => x.id === props.activeWorkspace)?.title}</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        {props.workspaces?.map(x => <>
                            <DropdownMenuItem>{x.title}</DropdownMenuItem>
                        </>)}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Create New</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {props.workspaces?.filter(x => x.id !== activeWorkspace?.id).map(x =>
                    <Button
                        key={x.id}
                        className={'rounded-sm w-full flex p-2 border-2'}
                        onClick={() => { setActiveWorkspace(x) }}
                    >
                        <span className="px-2">
                            {x.title}
                        </span>
                    </Button>
                )}
                <Button
                    className={'rounded-sm w-full flex p-2 border-2'}
                    onClick={() => {
                        setIsDialogOpen(true);
                    }}
                >
                    <span className="px-2">
                        Add new...
                    </span>
                </Button>
            </DropdownMenuContent>
        </DropdownMenu> */}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className={"flex text-white p-3 hover:bg-transparent hover:underline transition duration-300"}>
                    <span style={{ marginLeft: '0rem' }}>
                        {workspaceTitle}
                    </span>
                    <ChevronDown width={32} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent style={{ backgroundColor: '#ffffff32' }} className="text-white space-y-2 border-none">
                {props.workspaces?.filter(x => x.id !== activeWorkspace?.id).map(x =>
                    <Button
                        key={x.id}
                        className={'rounded-sm w-full flex p-2 border-2'}
                        onClick={() => { setActiveWorkspace(x) }}
                    >
                        <span className="px-2">
                            {x.title}
                        </span>
                    </Button>
                )}
                <Button
                    className={'rounded-sm w-full flex p-2 border-2'}
                    onClick={() => {
                        setIsDialogOpen(true);
                    }}
                >
                    <span className="px-2">
                        Add new...
                    </span>
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="bg-slate-800 border-0">
                <DialogHeader>
                    <DialogTitle>Create a new Workspace</DialogTitle>
                </DialogHeader>
                <div className="py-2">
                    <div className="flex flex-col">
                        <label htmlFor="wsName" className="block text-2xl font-medium text-gray-300 mb-2">Name</label>
                        <Input
                            id="wsName"
                            type="text"
                            placeholder="My New Workspace"
                            value={''}
                            onChange={(e) => { }}
                            className="w-full text-white placeholder:text-gray-300 border-0 bg-slate-600"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={handleDialogCancel} className="text-white bg-transparent">
                        Cancel
                    </Button>
                    <Button variant="default" onClick={handleDialogConfirm} className="text-slate-800 bg-white">
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>


    </div>
}

export const DashboardBtnLarge = (props: DashboardBtnLargeProps) => {
    const router = useRouter();
    const path = usePathname();
    const isActive = path === props.path;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, [path])

    return <>
        <button onMouseDown={() => {
            setLoading(true);
            router.push(props.path)
        }}
            className={("flex text-sm text-white p-2 rounded-full  transition duration-300") + (isActive === true ? ' bg-red-900 hover:bg-red-800' : ' hover:bg-gray-600')}>
            {loading ?
                <Loading text={props.title} className="text-white border-white" />
                : <>
                    <div className="mx-1">
                        {props.icon}
                    </div>
                    <div className="mx-1">
                        {props.title}
                    </div>
                </>}
        </button>
    </>
}

export const DashboardHeader = (props: HeaderProps) => {
    const router = useRouter()
    const [workspaces, setWorkspaces] = useState([] as Workspace[])
    const [activeWorkspace, setActiveWorkspace] = useState({} as Workspace)
    const [pageLoading, setPageLoading] = useState('');

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
                                    <DashboardDropdownLarge title="APIs Interface" path="/dashboard" icon={<Globe className="w-6 h-6 text-white" />} workspaces={[]} activeWorkspace={0} />}
                            </div>
                            <div className="absolute right-0 flex flex-row p-2">
                                <div className="flex flex-row gap-2" style={{ height: '45px', padding: '5px' }}>
                                    {menuEntries.map(x =>
                                        <DashboardBtnLarge key={x.title} title={x.title} path={x.path} icon={x.icon} />
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
                                            <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/' })}>
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

export default DashboardHeader;