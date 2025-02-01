'use client'
import { ChevronLeft, ChevronRight, FolderCode, EllipsisVertical } from "lucide-react";
import { useState } from "react";


import "@/styles/sidebar.scss"
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import CreateCollectionDialog from "./CreateCollectionModal";
import CollectionDropdown from "../icons/IconDropdown";
import Collections from "./Collections";
import { BaseUrl, Workspace, Collection, Endpoint, Doc } from "@/model";
import Loading from "../animated/Loading";
import ImportDialog from "./ImportDialog";

export type UrlParams = {
  orgId?: string | undefined,
  ws?: string | undefined,
  endpointId?: string | undefined
  collectionId?: string | undefined
}

export type LeftSidebarProps = {
  searchParams: ReadonlyURLSearchParams;
  baseUrls: BaseUrl[];
  buildUrlParams: (search: string, params: UrlParams) => string;
  sendDataToParent: (data: string) => void;
  setIsModalOpen: (open: boolean) => void;
  addWorkspace: (ws: Workspace) => void;
  setActiveWorkspace: (ws: Workspace) => void;
  setActiveCollection: (ws: Collection) => void;
  setActiveEndpoint: (ws: Endpoint) => void;
  setActiveDocumentation: (doc: Doc) => void;
  updateParams: (params: UrlParams) => void;
  collections: Collection[];
  workspaces: Workspace[];
  activeWorkspace: Workspace;
  activeCollection: Collection;
  activeEndpoint: Endpoint;
  setLoading: (loading: boolean) => void;
  updateCollections: () => void;
  collectionsLoading: boolean;
  setCollectionsLoading: (loading: boolean) => void;
};

const LeftSideBar = (props: LeftSidebarProps) => {
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false)
  const [isNewWorkspaceModalOpen, setIsNewWorkspaceModalOpen] = useState(false)
  const [newWorkspaceName, setNewWorkspaceName] = useState('My Workspace');
  const [newWorkspaceDescription, setNewWorkspaceDescription] = useState('My Workspace Description');
  const [newWorkspaceIcon, setNewWorkspaceIcon] = useState("Folder")

  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const handleCreateNewWorkspace = () => {
    const ids = props.workspaces.map(x => x?.id);
    const newId = Math.max(...ids) + 1;
    const newWorkspace = {
      id: newId,
      title: newWorkspaceName,
      description: newWorkspaceDescription,
      icon: newWorkspaceIcon,
    } as Workspace;
    props.addWorkspace(newWorkspace)
    props.setActiveWorkspace(newWorkspace)
    setIsNewWorkspaceModalOpen(false)
    setNewWorkspaceName(newWorkspace.title)
    setNewWorkspaceDescription(newWorkspace.description)
    setNewWorkspaceIcon(newWorkspace.icon)
  }

  const updateCollections = () => {
    props.setCollectionsLoading(true);
    props.updateCollections();
    props.setCollectionsLoading(false);
  }

  const [isNewCollectionModalOpen, setIsNewCollectionModalOpen] = useState(false)

  return (
    <div style={{ height: '92vh' }} className="bg-gray-800 border-r-2 border-red-400 p-4 shadow-md transition-all duration-300 ease-in-out">
      {isLeftSidebarCollapsed ? <ChevronRight className="text-gray-500 hover:text-gray-300" style={{ position: 'absolute', bottom: '1rem', left: '1rem' }} size={32} onClick={() => setIsLeftSidebarCollapsed(false)} />
        :
        <div
          className="flex flex-row gap-2 text-gray-500 hover:text-gray-300"
          style={{ position: 'absolute', bottom: '1rem', left: '1rem' }}
          onClick={() => setIsLeftSidebarCollapsed(true)}
        >
          <ChevronLeft size={32} />
          <span className="mt-1 hover:cursor-default">Collapse</span>
        </div>
      }
      <div className={`${isLeftSidebarCollapsed ? 'w-2' : 'w-72'}`}>
        {isLeftSidebarCollapsed
          ? <>
          </>
          : <>
            <div className="flex justify-between items-center mb-2 mt-2">
              <h2 className="font-semibold mb-2">Collections</h2>
              <ImportDialog searchParams={searchParams} />

              <CreateCollectionDialog open={isNewCollectionModalOpen} onOpenChange={setIsNewCollectionModalOpen}
                updateCollections={updateCollections}
              />
            </div>
            {props.collectionsLoading ? <Loading text="Loading collections..." /> 
            : <Collections
                baseUrls={props.baseUrls}
                collections={props.collections}
                activeCollection={props.activeCollection}
                updateParams={props.updateParams}
                setLoading={props.setLoading}
                updateCollections={updateCollections} 
                setActiveEndpoint={props.setActiveEndpoint} deleteEndpoint={
                  (endpoint: Endpoint) => {
                    throw new Error("Function not implemented.");
                  }
                } />
          }
          </>
        }
      </div>
    </div>
  )
}

export default LeftSideBar;