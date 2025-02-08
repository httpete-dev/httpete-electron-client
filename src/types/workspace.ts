import { Collection } from "./collection";
import { Endpoint } from "./api";

export type Workspace = {
  id?: number;
  title: string;
  description: string;
  organizationId: number;
  collections?: Collection[];
  icon: string;
}

export type WorkspaceData = {
  workspaces: Workspace[];
  activeWorkspace: Workspace;
  activeCollection: Collection;
  activeEndpoint: Endpoint;
}; 