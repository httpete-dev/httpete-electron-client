export type HttPeteResponse = {
  message: string | null;
  statusCode: number;
  content: any;
}

export type BaseUrl = {
  id?: number;
  workspaceId: number;
  protocol: string;
  value: string;
}

export type Collection = {
  id?: number;
  name: string;
  description: string;
  icon: string;
  organizationId: number;
  workspaceId: number;
  endpoints?: Endpoint[];
}

export type Document = {
  id: number;
  organizationId: number;
  workspaceId: number;
  parentId?: number;
  title: string;
  text: string;
  authorId: number;
  lastEditById: number;
  created: Date;
  lastEdited: Date;
  children?: Document[];
  endpointId?: number;
}

export type Endpoint = {
  id?: number;
  url: string;
  headers: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  baseUrl: BaseUrl;
  baseUrlId: number;
  body: string;
  collectionId: number;
  workspaceId: number;
  organizationId: number;
  documentation: Document;
}

export type Workspace = {
  id?: number;
  title: string;
  description: string;
  organizationId: number;
  collections?: Collection[];
}

// Define what API URL to use
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5073/api';

// Page Props Types
export type PageProps = {
  env: Env
}

export type Env = {
  NODE_ENV: 'development' | 'production' | 'test';
  AUTH_SECRET: string;
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

export type DocsPageProps = {
  setIsDocumentationChanged: (changed: boolean) => void;
  setActiveEndpoint: (endpoint: Endpoint) => void;
  activeEndpoint: Endpoint;
  activeDocumentation: Document;
  activeWorkspace: Workspace;
  setActiveDocumentation: (doc: Document) => void;
  setActiveDocumentationText: (txt: string) => void;
  setEditingTitle: (editing: boolean) => void;
  isMobile: boolean;
  docs: Document[];
}