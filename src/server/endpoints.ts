import axios from "axios";
import { Endpoint, HttPeteResponse } from "@/model";
import { API_URL } from "@/model";

export async function getEndpoints(params: { workspaceId?: number, collectionId?: number }): Promise<Endpoint[]> {
    try {
        const response = await axios.get<HttPeteResponse>(`${API_URL}/Endpoints/get`, { params });
        return response.data.content as Endpoint[];
    } catch (error) {
        console.error('Error fetching endpoints:', error);
        return [];
    }
}

export async function addEndpoint(endpoint: Endpoint): Promise<Endpoint | null> {
    try {
        const response = await axios.post<HttPeteResponse>(`${API_URL}/Endpoints/add`, {
            url: endpoint.url,
            headers: endpoint.headers,
            method: endpoint.method,
            baseUrl: {
                id: endpoint.baseUrl.id,
                workspaceId: endpoint.baseUrl.workspaceId,
                protocol: endpoint.baseUrl.protocol,
                value: endpoint.baseUrl.value
            },
            baseUrlId: endpoint.baseUrlId,
            body: endpoint.body,
            collectionId: endpoint.collectionId,
            workspaceId: endpoint.workspaceId,
            organizationId: endpoint.organizationId,
            documentation: {
                id: endpoint.documentation.id,
                organizationId: endpoint.documentation.organizationId,
                workspaceId: endpoint.documentation.workspaceId,
                parentId: endpoint.documentation.parentId,
                title: endpoint.documentation.title,
                text: endpoint.documentation.text,
                authorId: endpoint.documentation.authorId,
                lastEditById: endpoint.documentation.lastEditById,
                created: endpoint.documentation.created,
                lastEdited: endpoint.documentation.lastEdited,
                children: endpoint.documentation.children || [],
                endpointId: endpoint.documentation.endpointId
            }
        });
        return response.data.content as Endpoint;
    } catch (error) {
        console.error('Error adding endpoint:', error);
        return null;
    }
}

export async function updateEndpoint(endpoint: Endpoint): Promise<Endpoint | null> {
    try {
        const response = await axios.patch<HttPeteResponse>(`${API_URL}/Endpoints/update`, {
            id: endpoint.id,
            url: endpoint.url,
            headers: endpoint.headers,
            method: endpoint.method,
            baseUrl: {
                id: endpoint.baseUrl.id,
                workspaceId: endpoint.baseUrl.workspaceId,
                protocol: endpoint.baseUrl.protocol,
                value: endpoint.baseUrl.value
            },
            baseUrlId: endpoint.baseUrlId,
            body: endpoint.body,
            collectionId: endpoint.collectionId,
            workspaceId: endpoint.workspaceId,
            organizationId: endpoint.organizationId,
            documentation: {
                id: endpoint.documentation.id,
                organizationId: endpoint.documentation.organizationId,
                workspaceId: endpoint.documentation.workspaceId,
                parentId: endpoint.documentation.parentId,
                title: endpoint.documentation.title,
                text: endpoint.documentation.text,
                authorId: endpoint.documentation.authorId,
                lastEditById: endpoint.documentation.lastEditById,
                created: endpoint.documentation.created,
                lastEdited: endpoint.documentation.lastEdited,
                children: endpoint.documentation.children || [],
                endpointId: endpoint.documentation.endpointId
            }
        });
        return response.data.content as Endpoint;
    } catch (error) {
        console.error('Error updating endpoint:', error);
        return null;
    }
}

export async function deleteEndpoint(id: number): Promise<boolean> {
    try {
        const response = await axios.delete<HttPeteResponse>(`${API_URL}/Endpoints/delete`, {
            params: { id }
        });
        return response.data.statusCode === 200;
    } catch (error) {
        console.error('Error deleting endpoint:', error);
        return false;
    }
}