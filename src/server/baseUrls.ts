import axios from "axios";
import { BaseUrl, baseUrl } from "@/model";

export async function getBaseUrls(workspaceId: number) {
    try {
        const response = await axios.get(`${baseUrl}/baseUrls/get?workspaceId=${workspaceId}`);
        return response.data.content as BaseUrl[];
    } catch (error) {
        console.error('Error fetching base urls:', error);
        return [] as BaseUrl[];
    }
}

export async function addBaseUrl(newBaseUrl: BaseUrl) {
    try {
        const response = await axios.post(`${baseUrl}/baseUrls/add`, newBaseUrl);
        return response.data.content as BaseUrl;
    } catch (error) {
        console.error('Error adding base url:', error);
        return null;
    }
}