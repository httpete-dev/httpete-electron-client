import Navbar from "@/components/layout/navbar";
import LeftSideBar, { UrlParams } from "@/components/sidebar/left-sidebar";
import { Workspace, Collection, Endpoint, Doc } from "@/model";
import { ReadonlyURLSearchParams } from "next/navigation";

export const fallbackDoc: Doc = {
  id: -1,
  type: 'document',
  title: 'Getting Started',
  text: '# Getting Started\n\nWelcome to the documentation.',
  children: []
};

export const fallbackBaseUrl = { 
  id: -1, 
  workspaceId: -1, 
  protocol: 'http', 
  value: 'localhost:3000' 
};

export const fallbackEndpoint: Endpoint = { 
  id: -1, 
  workspaceId: -1,
  collectionId: -1, 
  name: 'Example Endpoint', 
  baseUrl: fallbackBaseUrl, 
  baseUrlId: -1, 
  url: '/api/example', 
  method: 'GET', 
  headers: '{\n  "Content-Type": "application/json"\n}', 
  body: '{\n  "example": "data"\n}', 
  documentation: fallbackDoc,
  tests: []
};

export const fallbackCollection: Collection = {
  id: -1,
  name: 'Example Collection',
  description: 'A collection of API endpoints',
  icon: 'folder',
  endpoints: [fallbackEndpoint]
};

export const fallbackWorkspaces: Workspace[] = [
  {
    id: 1,
    organizationId: 1,
    title: 'E-commerce API',
    description: 'API documentation for the e-commerce platform',
    icon: 'Shopping',
    collections: [
      {
        id: 1,
        name: 'Products',
        description: 'Product management endpoints',
        icon: 'package',
        endpoints: [
          {
            id: 1,
            workspaceId: 1,
            collectionId: 1,
            name: 'Get Products',
            baseUrl: fallbackBaseUrl,
            baseUrlId: 1,
            url: '/api/products',
            method: 'GET',
            headers: '{\n  "Content-Type": "application/json"\n}',
            body: '',
            documentation: {
              id: 101,
              type: 'document',
              title: 'Get Products API',
              text: '# Get Products\n\nRetrieve a list of products with optional filtering.',
              children: []
            },
            tests: []
          }
        ]
      },
      {
        id: 2,
        name: 'Orders',
        description: 'Order management endpoints',
        icon: 'shopping-cart',
        endpoints: [
          {
            id: 2,
            workspaceId: 1,
            collectionId: 2,
            name: 'Create Order',
            baseUrl: fallbackBaseUrl,
            baseUrlId: 1,
            url: '/api/orders',
            method: 'POST',
            headers: '{\n  "Content-Type": "application/json"\n}',
            body: '{\n  "productId": "string",\n  "quantity": "number"\n}',
            documentation: {
              id: 102,
              type: 'document',
              title: 'Create Order API',
              text: '# Create Order\n\nCreate a new order in the system.',
              children: []
            },
            tests: []
          }
        ]
      },
      {
        id: 3,
        name: 'Users',
        description: 'User management endpoints',
        icon: 'users',
        endpoints: [
          {
            id: 3,
            workspaceId: 1,
            collectionId: 3,
            name: 'User Profile',
            baseUrl: fallbackBaseUrl,
            baseUrlId: 1,
            url: '/api/users/profile',
            method: 'GET',
            headers: '{\n  "Content-Type": "application/json"\n}',
            body: '',
            documentation: {
              id: 103,
              type: 'document',
              title: 'User Profile API',
              text: '# User Profile\n\nRetrieve the current user\'s profile.',
              children: []
            },
            tests: []
          }
        ]
      }
    ]
  },
  {
    id: 2,
    organizationId: 1,
    title: 'Analytics API',
    description: 'API documentation for the analytics platform',
    icon: 'BarChart',
    collections: [
      {
        id: 4,
        name: 'Events',
        description: 'Event tracking endpoints',
        icon: 'activity',
        endpoints: [
          {
            id: 4,
            workspaceId: 2,
            collectionId: 4,
            name: 'Track Event',
            baseUrl: fallbackBaseUrl,
            baseUrlId: 1,
            url: '/api/events',
            method: 'POST',
            headers: '{\n  "Content-Type": "application/json"\n}',
            body: '{\n  "eventName": "string",\n  "properties": "object"\n}',
            documentation: {
              id: 104,
              type: 'document',
              title: 'Track Event API',
              text: '# Track Event\n\nTrack a custom event in the analytics system.',
              children: []
            },
            tests: []
          }
        ]
      },
      {
        id: 5,
        name: 'Reports',
        description: 'Reporting endpoints',
        icon: 'file-text',
        endpoints: [
          {
            id: 5,
            workspaceId: 2,
            collectionId: 5,
            name: 'Generate Report',
            baseUrl: fallbackBaseUrl,
            baseUrlId: 1,
            url: '/api/reports',
            method: 'POST',
            headers: '{\n  "Content-Type": "application/json"\n}',
            body: '{\n  "reportType": "string",\n  "dateRange": "object"\n}',
            documentation: {
              id: 105,
              type: 'document',
              title: 'Generate Report API',
              text: '# Generate Report\n\nGenerate a custom analytics report.',
              children: []
            },
            tests: []
          }
        ]
      },
      {
        id: 6,
        name: 'Dashboards',
        description: 'Dashboard management endpoints',
        icon: 'layout-dashboard',
        endpoints: [
          {
            id: 6,
            workspaceId: 2,
            collectionId: 6,
            name: 'Get Dashboard',
            baseUrl: fallbackBaseUrl,
            baseUrlId: 1,
            url: '/api/dashboards',
            method: 'GET',
            headers: '{\n  "Content-Type": "application/json"\n}',
            body: '',
            documentation: {
              id: 106,
              type: 'document',
              title: 'Get Dashboard API',
              text: '# Get Dashboard\n\nRetrieve dashboard configuration and data.',
              children: []
            },
            tests: []
          }
        ]
      }
    ]
  }
];

// Default document tree structure
export const defaultGeneralDocs: Doc[] = [
  {
    id: 1,
    type: 'folder',
    title: 'General',
    text: '',
    children: [
      {
        id: 2,
        type: 'document',
        title: 'Getting Started',
        text: '# Getting Started\n\nWelcome to the documentation.',
        children: []
      },
      {
        id: 3,
        type: 'document',
        title: 'API Overview',
        text: '# API Overview\n\nThis document provides an overview of the API.',
        children: []
      }
    ]
  },
  {
    id: 4,
    type: 'folder',
    title: 'Guides',
    text: '',
    children: [
      {
        id: 5,
        type: 'document',
        title: 'Authentication',
        text: '# Authentication\n\nLearn how to authenticate with the API.',
        children: []
      }
    ]
  }
];

export type SidebarType = 'collections' | 'none'

export default function DashboardLayout({ children, sidebarType = 'collections' }: { children: React.ReactNode, sidebarType?: SidebarType }) {
  const defaultWorkspace = fallbackWorkspaces[0];
  const defaultCollection = defaultWorkspace.collections[0];
  const defaultEndpoint = defaultCollection?.endpoints?.[0] ?? fallbackEndpoint;

  return (
    <div className="flex flex-col min-h-screen">
      <nav>
        <Navbar 
          title="Dashboard" 
          isMobile={false} 
          activeWorkspace={defaultWorkspace} 
          setActiveWorkspace={() => {}} 
          workspaces={fallbackWorkspaces} 
        />
      </nav>
      <div className="flex flex-row min-h-screen bg-gray-900 text-gray-100">
        {sidebarType === 'collections' && (
          <LeftSideBar 
            searchParams={new ReadonlyURLSearchParams} 
            baseUrls={[fallbackBaseUrl]} 
            buildUrlParams={(search: string, params: UrlParams) => search}
            sendDataToParent={() => {}}
            setIsModalOpen={() => {}}
            addWorkspace={() => {}}
            setActiveWorkspace={() => {}}
            setActiveCollection={() => {}}
            setActiveEndpoint={() => {}}
            setActiveDocumentation={() => {}}
            updateParams={() => {}}
            collections={defaultCollection ? [defaultCollection] : []}
            workspaces={fallbackWorkspaces}
            activeWorkspace={defaultWorkspace}
            activeCollection={defaultCollection}
            activeEndpoint={defaultEndpoint}
            setLoading={() => {}}
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
  )
}