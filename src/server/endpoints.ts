import axios from "axios";
import { baseUrl } from "@/model";

export async function addEndpoint(collectionId: number) {
    try {
        const response = await axios.get(baseUrl + `/api/endpoint/add?collectionId=${collectionId}`);
        return response.data;
    } catch (error) {
        console.error('Error adding endpoint:', error);
        return {};
    }
}

export async function deletEndpoint(endpointId: number) {
    try {
        const response = await axios.delete(baseUrl + `/api/endpoint/delete?endpointId=${endpointId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting endpoint:', error);
        return {};
    }
}