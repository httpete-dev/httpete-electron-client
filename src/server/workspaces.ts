import axios from "axios";
import { baseUrl, Workspace } from "@/model";

type NewWorkspaceDTO = {
    userId: number,
    wsName: string
}

export async function createNewWorkspace(dto: NewWorkspaceDTO): Promise<Workspace> {
    return await axios.post(baseUrl + '/api/workspace/create', { dto })
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
        const response = await axios.get(baseUrl  + `/filesystem/workspaces`);
        localStorage.setItem('workspaces', JSON.stringify(response.data.content));
        return response.data.content as Workspace[];
    } catch (error) {
        console.error('Error fetching workspaces:', error);
        return [] as Workspace[];
    }
}

export async function getWorkspaces(userId: number) {
    try {
        console.log('getWorkspaces', userId, baseUrl)
        const response = await axios.get(`${baseUrl}/workspace/get-for-user?userId=${userId}`);
        return response.data as Workspace[];
    } catch (error) {
        console.error('Error fetching workspaces:', error);
        return [] as Workspace[];
    }
}