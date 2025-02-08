import { createContext, useContext } from 'react';
import { BaseUrl, Collection, ApiDocument, Endpoint, Workspace, fallbackBaseUrl, fallbackEndpoint, fallbackWorkspace } from '@/types';

export type DashboardContextType = {
  activeWorkspace: Workspace;
  setActiveWorkspace: (workspace: Workspace) => void;
  activeCollection: Collection;
  setActiveCollection: (collection: Collection) => void;
  activeEndpoint: Endpoint;
  setActiveEndpoint: (endpoint: Endpoint) => void;
  baseUrls: BaseUrl[];
  setBaseUrls: (urls: BaseUrl[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

export const DashboardContext = createContext<DashboardContextType>({
  activeWorkspace: fallbackWorkspace,
  setActiveWorkspace: () => {},
  activeCollection: fallbackWorkspace.collections![0],
  setActiveCollection: () => {},
  activeEndpoint: fallbackEndpoint,
  setActiveEndpoint: () => {},
  baseUrls: [fallbackBaseUrl],
  setBaseUrls: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

export const useDashboard = () => useContext(DashboardContext); 