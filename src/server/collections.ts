import axios from "axios";
import { Collection, HttPeteResponse } from "@/model";
import { API_URL } from "@/model";

export async function getCollection(id: number): Promise<Collection | null> {
    try {
        const response = await axios.get<HttPeteResponse>(`${API_URL}/Collections/${id}`);
        return response.data.content as Collection;
    } catch (error) {
        console.error('Error fetching collection:', error);
        return null;
    }
}

export async function addCollection(collection: Collection): Promise<Collection | null> {
    try {
        const response = await axios.post<HttPeteResponse>(`${API_URL}/Collections/add`, {
            name: collection.name,
            description: collection.description,
            icon: collection.icon,
            organizationId: collection.organizationId,
            workspaceId: collection.workspaceId,
            endpoints: collection.endpoints?.map(endpoint => ({
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
            })) || []
        });
        return response.data.content as Collection;
    } catch (error) {
        console.error('Error adding collection:', error);
        return null;
    }
}

export async function updateCollection(collection: Collection): Promise<Collection | null> {
    try {
        const response = await axios.patch<HttPeteResponse>(`${API_URL}/Collections/update`, {
            id: collection.id,
            name: collection.name,
            description: collection.description,
            icon: collection.icon,
            organizationId: collection.organizationId,
            workspaceId: collection.workspaceId,
            endpoints: collection.endpoints?.map(endpoint => ({
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
            })) || []
        });
        return response.data.content as Collection;
    } catch (error) {
        console.error('Error updating collection:', error);
        return null;
    }
}

export async function deleteCollection(id: number): Promise<boolean> {
    try {
        const response = await axios.delete<HttPeteResponse>(`${API_URL}/Collections/delete`, {
            params: { id }
        });
        return response.data.statusCode === 200;
    } catch (error) {
        console.error('Error deleting collection:', error);
        return false;
    }
}