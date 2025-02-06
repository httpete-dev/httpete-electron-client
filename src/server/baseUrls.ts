import axios from "axios";
import { BaseUrl, HttPeteResponse } from "@/model";

const API_URL = "http://localhost:5073/api";

export async function getBaseUrls(workspaceId: number): Promise<BaseUrl[]> {
    try {
        const response = await axios.get<HttPeteResponse>(`${API_URL}/BaseUrls/get`, {
            params: { workspaceId }
        });
        return response.data.content as BaseUrl[];
    } catch (error) {
        console.error('Error fetching base urls:', error);
        return [];
    }
}

export async function addBaseUrl(baseUrl: BaseUrl): Promise<BaseUrl | null> {
    try {
        const response = await axios.post<HttPeteResponse>(`${API_URL}/BaseUrls/add`, baseUrl);
        return response.data.content as BaseUrl;
    } catch (error) {
        console.error('Error adding base url:', error);
        return null;
    }
}

export async function updateBaseUrl(baseUrl: BaseUrl): Promise<BaseUrl | null> {
    try {
        const response = await axios.patch<HttPeteResponse>(`${API_URL}/BaseUrls/update`, baseUrl);
        return response.data.content as BaseUrl;
    } catch (error) {
        console.error('Error updating base url:', error);
        return null;
    }
}

export async function deleteBaseUrl(id: number): Promise<boolean> {
    try {
        const response = await axios.delete<HttPeteResponse>(`${API_URL}/BaseUrls/delete`, {
            params: { id }
        });
        return response.data.statusCode === 200;
    } catch (error) {
        console.error('Error deleting base url:', error);
        return false;
    }
}