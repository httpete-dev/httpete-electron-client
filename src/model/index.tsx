import { Session } from "next-auth";

export type PageProps = {
  env: Env
}





/// Define what API URL to use
/// If localMode is true, use localhost:7194/api - Pulse.Engine local WebAPI
/// If localMode is false, use:
/// - If pete-debug is set, use http://localhost:5273/api - HttPete local WebAPI
/// - Otherwise, use https://api.httpete.com/api - HttPete production WebAPI
export const getBaseUrl = () => {
  const isLocalMode = process.env.NEXT_PUBLIC_LOCAL_MODE === "true";
  const isDebugMode = process.env.NEXT_PUBLIC_PETE_DEBUG === "true";

  console.log('isLocalMode', isLocalMode)
  console.log('isDebugMode', isDebugMode)

  const pulseLocalApiUrl = 'https://localhost:7194/api';
  const debugHttpeteApiUrl = 'http://localhost:5273/api';
  const productionHttpeteApiUrl = 'https://api.httpete.com/api';

  return isLocalMode 
            ? pulseLocalApiUrl 
            : isDebugMode 
                ? debugHttpeteApiUrl
                : productionHttpeteApiUrl;
}

export let baseUrl = getBaseUrl();

export type Env = {
    NODE_ENV: 'development' | 'production' | 'test',
    AUTH_SECRET: string
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_CLIENT_ID: string;
    GITHUB_CLIENT_SECRET: string;
    GITHUB_CLIENT_ID: string;
  }

export type WorkspaceData = {
    workspaces: Workspace[];
    activeWorkspace: Workspace;
    activeCollection: Collection;
    activeEndpoint: Endpoint;
  };

  export type Workspace = {
    id: number
    organizationId: number
    title:string
    description:string
    icon:string
    collections: Collection[]
}

export type Collection = {
    id?: number
    name: string
    description: string
    icon: string
    endpoints?: Endpoint[]
}
export type BaseUrl = {
  id?: number
  workspaceId: number
  protocol: string
  value: string
}

export type EndpointTest = {
  name: string,
  file: string,
  authorName: string,
  authoredDate: Date,
  lastModifyByName: string,
  lastModifyDate: Date,
}

export type Endpoint = {
    workspaceId: number;
    collectionId: number;
    id: number
    name: string;
    baseUrl: BaseUrl;
    baseUrlId: number;
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
    headers: string
    body: string
    documentation: Doc,
    tests?: EndpointTest[] | undefined | null 
}

export type Doc = {
  id: number,
  type: 'document' | 'folder' | 'file',
  title: string,
  text: string,
  updatedBy?: string | null,
  updated?: Date | null,
  children?: Doc[] | null
}

export type DocsPageProps = {
  setIsDocumentationChanged: (changed: boolean) => void;
  setActiveEndpoint: (endpoint: Endpoint) => void;
  activeEndpoint: Endpoint,
  activeDocumentation: Doc,
  activeWorkspace: Workspace,
  setActiveDocumentation: (doc: Doc) => void;
  setActiveDocumentationText: (txt: string) => void;
  setEditingTitle: (editing: boolean) => void;
  isMobile:boolean,
  session: Session,
  docs: Doc[]
}