import Navbar from "@/components/layout/navbar";
import LeftSideBar, { UrlParams } from "@/components/sidebar/left-sidebar";
import { Workspace, Collection, Endpoint, Doc } from "@/model";
import { ReadonlyURLSearchParams } from "next/navigation";

 
export default function DashboardLayout({ children }) {
  return (
    <div className="h-full max-h-screen">
      <Navbar title="Dashboard" isMobile={false} />
      <div className="grid grid-cols-4 max-h-full">
        <div className="col-span-1">

        <LeftSideBar searchParams={new ReadonlyURLSearchParams} baseUrls={[]} buildUrlParams={function (search: string, params: UrlParams): string {
          throw new Error("Function not implemented.");
        } } sendDataToParent={function (data: string): void {
          throw new Error("Function not implemented.");
        } } setIsModalOpen={function (open: boolean): void {
          throw new Error("Function not implemented.");
        } } addWorkspace={function (ws: Workspace): void {
          throw new Error("Function not implemented.");
        } } setActiveWorkspace={function (ws: Workspace): void {
          throw new Error("Function not implemented.");
        } } setActiveCollection={function (ws: Collection): void {
          throw new Error("Function not implemented.");
        } } setActiveEndpoint={function (ws: Endpoint): void {
          throw new Error("Function not implemented.");
        } } setActiveDocumentation={function (doc: Doc): void {
          throw new Error("Function not implemented.");
        } } updateParams={function (params: UrlParams): void {
          throw new Error("Function not implemented.");
        } } collections={[]} workspaces={[]} activeWorkspace={undefined} activeCollection={undefined} activeEndpoint={undefined} setLoading={function (loading: boolean): void {
          throw new Error("Function not implemented.");
        } } updateCollections={function (): void {
          throw new Error("Function not implemented.");
        } } collectionsLoading={false} setCollectionsLoading={function (loading: boolean): void {
          throw new Error("Function not implemented.");
        } }  />
        </div>
        <div className="col-span-3">
          <main>{children}</main>

        </div>
      </div>
    </div>
  )
}