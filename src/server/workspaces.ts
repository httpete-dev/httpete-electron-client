import axios from "axios";
import { Workspace, HttPeteResponse } from "@/model";
import { API_URL } from "@/model";

type NewWorkspaceDTO = {
    userId: number,
    wsName: string
}

export async function createNewWorkspace(dto: NewWorkspaceDTO): Promise<Workspace> {
    return await axios.post(API_URL + '/workspace/create', { dto })
        .then(async (res) => {
            return res.data as Workspace;
        })
        .catch(err => {
            console.log('Error creating workspace: ', err);
            return {} as Workspace;
        })
}

export async function getLocalWorkspaces() {
    try {
        const response = await axios.get(API_URL  + `/filesystem/workspaces`);
        localStorage.setItem('workspaces', JSON.stringify(response.data.content));
        return response.data.content as Workspace[];
    } catch (error) {
        console.error('Error fetching workspaces:', error);
        return [] as Workspace[];
    }
}

export async function getWorkspaces(userId: number) {
    try {
        console.log('getWorkspaces', userId, API_URL)
        const response = await axios.get(`${API_URL}/workspace/get-for-user?userId=${userId}`);
        return response.data as Workspace[];
    } catch (error) {
        console.error('Error fetching workspaces:', error);
        return [] as Workspace[];
    }
}

export async function getWorkspace(id: number): Promise<Workspace | null> {
    try {
        const response = await axios.get<HttPeteResponse>(`${API_URL}/Workspaces/get`, {
            params: { id }
        });
        return response.data.content as Workspace;
    } catch (error) {
        console.error('Error fetching workspace:', error);
        return null;
    }
}

export async function addWorkspace(workspace: Workspace): Promise<Workspace | null> {
    try {
        const response = await axios.post<HttPeteResponse>(`${API_URL}/Workspaces/add`, {
            title: workspace.title,
            description: workspace.description,
            organizationId: workspace.organizationId,
            collections: workspace.collections || []
        });
        return response.data.content as Workspace;
    } catch (error) {
        console.error('Error adding workspace:', error);
        return null;
    }
}

export async function updateWorkspace(workspace: Workspace): Promise<Workspace | null> {
    try {
        const response = await axios.patch<HttPeteResponse>(`${API_URL}/Workspaces/update`, {
            id: workspace.id,
            title: workspace.title,
            description: workspace.description,
            organizationId: workspace.organizationId,
            collections: workspace.collections || []
        });
        return response.data.content as Workspace;
    } catch (error) {
        console.error('Error updating workspace:', error);
        return null;
    }
}

export async function deleteWorkspace(id: number): Promise<boolean> {
    try {
        const response = await axios.delete<HttPeteResponse>(`${API_URL}/Workspaces/delete`, {
            params: { id }
        });
        return response.data.statusCode === 200;
    } catch (error) {
        console.error('Error deleting workspace:', error);
        return false;
    }
}