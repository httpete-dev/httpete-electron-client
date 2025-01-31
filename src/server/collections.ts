import axios from "axios";
import { Collection, baseUrl } from "@/model";

export async function addCollection(collection: Collection) {
    try {
        const response = await axios.post(baseUrl + `/api/collections/add`, collection );
        return response.data;
    } catch (error) {
        console.error('Error adding collection:', error);
        return {};
    }
}

export async function deleteCollection(collectionId: number) {
    try {
        const response = await axios.delete(baseUrl + `/api/collections/delete?collectionId=${collectionId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting collection:', error);
        return {};
    }
}