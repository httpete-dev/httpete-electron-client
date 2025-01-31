import { Workspace } from "@/model";
import { createNewWorkspace } from "@/server/workspaces";
import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@radix-ui/react-dropdown-menu";
import { ChevronDown } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { Input } from "../ui/input";
import "@/styles/globals.css"
type DashboardDropdownLargeProps = {
    title: string,
    icon: React.ReactNode,
    path: string,
    workspaces: Workspace[],
    activeWorkspace: number
}

export const DashboardDropdownLarge = (props: DashboardDropdownLargeProps) => {
    const router = useRouter();
    const path = usePathname();
    const isActive = path === props.path;

    const [activeWorkspace, setActiveWorkspace] = useState({ id: 0 } as Workspace)
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newWorkspaceName, setNewWorkspaceName] = useState('');
    const [workspaceTitle, setWorkspaceTitle] = useState('Personal Workspace');

    const handleDialogConfirm = () => {
        const userId = parseInt('-1');
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

