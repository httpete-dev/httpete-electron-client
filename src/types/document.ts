import { Endpoint } from "./api";
import { Workspace } from "./workspace";

// Base document type with common properties
interface BaseDocument {
  id: number;
  title: string;
  text: string;
  organizationId: number;
  workspaceId: number;
  authorId: number;
  lastEditById: number;
  created: Date;
  lastEdited: Date;
}

// Documentation specifically for endpoints - no nesting
export interface EndpointDocumentation extends BaseDocument {
  type: 'endpoint';
  endpointId: number;
}

// General documentation that can be nested in folders
export interface GeneralDocument extends BaseDocument {
  type: 'document' | 'folder';
  parentId?: number;
  children: GeneralDocument[];
}

// Props type for the documentation page
export type DocsPageProps = {
  setIsDocumentationChanged: (changed: boolean) => void;
  setActiveEndpoint: (endpoint: Endpoint) => void;
  activeEndpoint: Endpoint;
  activeDocumentation: GeneralDocument | EndpointDocumentation;
  activeWorkspace: Workspace;
  setActiveDocumentation: (doc: GeneralDocument | EndpointDocumentation) => void;
  setActiveDocumentationText: (txt: string) => void;
  setEditingTitle: (editing: boolean) => void;
  isMobile: boolean;
  docs: GeneralDocument[];
} 