import { BaseUrl, Collection, Endpoint, GeneralDocument, EndpointDocumentation, Workspace } from ".";

export const fallbackGeneralDoc: GeneralDocument = {
    id: -1,
    type: 'document',
    title: 'New Document',
    text: '# New Document\n\nAdd your documentation here.',
    children: [],
    organizationId: -1,
    workspaceId: -1,
    authorId: -1,
    lastEditById: -1,
    created: new Date(),
    lastEdited: new Date()
};

export const fallbackEndpointDoc: EndpointDocumentation = {
    id: -1,
    type: 'endpoint',
    title: 'New Endpoint Documentation',
    text: '# New Endpoint\n\nAdd documentation for this endpoint.',
    organizationId: -1,
    workspaceId: -1,
    authorId: -1,
    lastEditById: -1,
    created: new Date(),
    lastEdited: new Date(),
    endpointId: -1
};

export const fallbackBaseUrl: BaseUrl = { 
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
    documentation: fallbackEndpointDoc,
    tests: [],
    organizationId: -1
};

export const fallbackCollection: Collection = {
    id: -1,
    name: 'Example Collection',
    description: 'A collection of API endpoints',
    icon: 'folder',
    endpoints: [fallbackEndpoint],
    organizationId: -1,
    workspaceId: -1
};

export const fallbackWorkspace: Workspace = {
    id: -1,
    title: 'Default Workspace',
    description: 'Default workspace for new users',
    organizationId: -1,
    collections: [fallbackCollection],
    icon: 'folder'
}; 