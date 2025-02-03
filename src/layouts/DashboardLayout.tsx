import Navbar from "@/components/layout/navbar";
import LeftSideBar, { UrlParams } from "@/components/sidebar/left-sidebar";
import { Workspace, Collection, Endpoint, Doc } from "@/model";
import { ReadonlyURLSearchParams } from "next/navigation";

export const fallbackBaseUrl = { id: -1, workspaceId: -1, protocol: 'http', value: 'Unable to read base URL' };
export const fallbackEndpoint = { id: -1, collectionId: -1, name: 'Unable to read endpoint', baseUrl: fallbackBaseUrl, baseUrlId: -1, url: 'Unable to read URL', method: 'GET', headers: '', body: '', documentation: { title: 'Unable to read documentation', text: '' }, tests: [] };
export const fallbackWorkspace = { id: -1, organizationId: -1, title: 'Unable to read workspace', description: 'Unable to read workspace description', icon: 'Globe' };

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <nav>
        <Navbar title="Dashboard" isMobile={false} activeWorkspace={undefined} setActiveWorkspace={function (ws: number): void {
          throw new Error("Function not implemented.");
        }} workspaces={[]} />
      </nav>
      <div className="flex flex-row min-h-screen bg-gray-900 text-gray-100">
        <LeftSideBar searchParams={new ReadonlyURLSearchParams} baseUrls={[]} buildUrlParams={function (search: string, params: UrlParams): string {
          throw new Error("Function not implemented.");
        }} sendDataToParent={function (data: string): void {
          throw new Error("Function not implemented.");
        }} setIsModalOpen={function (open: boolean): void {
          throw new Error("Function not implemented.");
        }} addWorkspace={function (ws: Workspace): void {
          throw new Error("Function not implemented.");
        }} setActiveWorkspace={function (ws: Workspace): void {
          throw new Error("Function not implemented.");
        }} setActiveCollection={function (ws: Collection): void {
          throw new Error("Function not implemented.");
        }} setActiveEndpoint={function (ws: Endpoint): void {
          throw new Error("Function not implemented.");
        }} setActiveDocumentation={function (doc: Doc): void {
          throw new Error("Function not implemented.");
        }} updateParams={function (params: UrlParams): void {
          throw new Error("Function not implemented.");
        }} collections={[]} workspaces={[]}
          activeWorkspace={{} as Workspace}
          activeCollection={{} as Collection}
          activeEndpoint={{} as Endpoint}
          setLoading={function (loading: boolean): void {
            throw new Error("Function not implemented.");
          }} updateCollections={function (): void {
            throw new Error("Function not implemented.");
          }} collectionsLoading={false} setCollectionsLoading={function (loading: boolean): void {
            throw new Error("Function not implemented.");
          }} />
        <main className="">
          {children}
        </main>
      </div>
    </div>
  )
}