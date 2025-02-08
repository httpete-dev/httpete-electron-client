import Navbar from "@/components/layout/navbar";
import LeftSideBar, { UrlParams } from "@/components/sidebar/left-sidebar";
import { Workspace, Collection, Endpoint, BaseUrl, fallbackWorkspace, fallbackBaseUrl, fallbackEndpoint, fallbackCollection } from "@/types";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { DashboardContext } from "@/contexts/DashboardContext";

export type SidebarType = 'collections' | 'none'

export default function DashboardLayout({ children, sidebarType = 'collections' }: { children: React.ReactNode, sidebarType?: SidebarType }) {
  const searchParams = useSearchParams();
  const [activeWorkspace, setActiveWorkspace] = useState(fallbackWorkspace);
  const [activeCollection, setActiveCollection] = useState(activeWorkspace.collections?.[0] ?? fallbackCollection);
  const [activeEndpoint, setActiveEndpoint] = useState(activeCollection?.endpoints?.[0] ?? fallbackEndpoint);
  const [baseUrls, setBaseUrls] = useState<BaseUrl[]>([fallbackBaseUrl]);
  const [isLoading, setIsLoading] = useState(false);

  // Update state based on URL params
  useEffect(() => {
    const workspaceId = parseInt(searchParams.get('workspaceId') ?? '-1');
    const collectionId = parseInt(searchParams.get('collectionId') ?? '-1');
    const endpointId = parseInt(searchParams.get('endpointId') ?? '-1');

    // Update workspace if changed
    const newWorkspace = fallbackWorkspace;
    if (newWorkspace.id !== activeWorkspace.id) {
      setActiveWorkspace(newWorkspace);
    }

    // Update collection if changed
    const newCollection = newWorkspace.collections?.find(c => c.id === collectionId) ?? newWorkspace.collections?.[0] ?? fallbackCollection;
    if (newCollection?.id !== activeCollection?.id) {
      setActiveCollection(newCollection);
    }

    // Update endpoint if changed
    const newEndpoint = newCollection?.endpoints?.find(e => e.id === endpointId) ?? newCollection?.endpoints?.[0] ?? fallbackEndpoint;
    if (newEndpoint.id !== activeEndpoint.id) {
      setActiveEndpoint(newEndpoint);
    }
  }, [searchParams]);

  const contextValue = {
    activeWorkspace,
    setActiveWorkspace,
    activeCollection,
    setActiveCollection,
    activeEndpoint,
    setActiveEndpoint,
    baseUrls,
    setBaseUrls,
    isLoading,
    setIsLoading,
  };

  const handleSetActiveWorkspace = (workspace: Workspace | number) => {
    if (typeof workspace === 'number') {
      const found = fallbackWorkspace;
      if (found) setActiveWorkspace(found);
    } else {
      setActiveWorkspace(workspace);
    }
  };

  return (
    <DashboardContext.Provider value={contextValue}>
      <div className="flex flex-col min-h-screen">
        <nav>
          <Navbar 
            title="Dashboard" 
            isMobile={false} 
            activeWorkspace={activeWorkspace} 
            setActiveWorkspace={handleSetActiveWorkspace} 
            workspaces={[fallbackWorkspace]} 
          />
        </nav>
        <div className="flex flex-row min-h-screen bg-gray-900 text-gray-100">
          {sidebarType === 'collections' && (
            <LeftSideBar 
              searchParams={searchParams}
              baseUrls={baseUrls} 
              buildUrlParams={(search: string, params: UrlParams) => search}
              sendDataToParent={() => {}}
              setIsModalOpen={() => {}}
              addWorkspace={() => {}}
              setActiveWorkspace={handleSetActiveWorkspace}
              setActiveCollection={setActiveCollection}
              setActiveEndpoint={setActiveEndpoint}
              setActiveDocumentation={() => {}}
              updateParams={() => {}}
              collections={activeCollection ? [activeCollection] : []}
              workspaces={[fallbackWorkspace]}
              activeWorkspace={activeWorkspace}
              activeCollection={activeCollection}
              activeEndpoint={activeEndpoint}
              setLoading={setIsLoading}
              updateCollections={() => {}}
              collectionsLoading={false}
              setCollectionsLoading={() => {}}
            />
          )}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </DashboardContext.Provider>
  )
}