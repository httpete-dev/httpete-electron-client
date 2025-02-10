import { getWorkspaces, createNewWorkspace, updateWorkspace, deleteWorkspace, addWorkspace } from '../workspaces';
import axios from 'axios';
import { Workspace } from '@/types/workspace';
import { API_URL } from '@/model';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('workspaces API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getWorkspaces', () => {
    it('fetches workspaces successfully', async () => {
      const mockData = [
        { id: 1, title: 'Workspace 1', description: '', organizationId: 1, icon: '', collections: [] },
        { id: 2, title: 'Workspace 2', description: '', organizationId: 1, icon: '', collections: [] }
      ];
      mockedAxios.get.mockResolvedValueOnce({ data: mockData });

      const result = await getWorkspaces(1);
      expect(result).toEqual(mockData);
      expect(mockedAxios.get).toHaveBeenCalledWith(`${API_URL}/workspace/get-for-user?userId=1`);
    });

    it('handles errors when fetching workspaces', async () => {
      const error = new Error('Network error');
      mockedAxios.get.mockRejectedValueOnce(error);

      const result = await getWorkspaces(1);
      expect(result).toEqual([]);
    });
  });

  describe('createNewWorkspace', () => {
    const newWorkspaceDto = {
      userId: 1,
      wsName: 'New Workspace'
    };

    it('creates a workspace successfully', async () => {
      const mockResponse = { id: 1, title: 'New Workspace', description: '', organizationId: 1, icon: '', collections: [] };
      mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

      const result = await createNewWorkspace(newWorkspaceDto);
      expect(result).toEqual(mockResponse);
      expect(mockedAxios.post).toHaveBeenCalledWith(`${API_URL}/workspace/create`, { dto: newWorkspaceDto });
    });

    it('handles errors when creating a workspace', async () => {
      const error = new Error('Invalid workspace data');
      mockedAxios.post.mockRejectedValueOnce(error);

      const result = await createNewWorkspace(newWorkspaceDto);
      expect(result).toEqual({});
    });
  });

  describe('addWorkspace', () => {
    const newWorkspace: Workspace = {
      title: 'New Workspace',
      description: 'Test workspace',
      organizationId: 1,
      icon: '',
      collections: []
    };

    it('adds a workspace successfully', async () => {
      const mockResponse = { id: 1, ...newWorkspace };
      mockedAxios.post.mockResolvedValueOnce({ data: { content: mockResponse, statusCode: 200 } });

      const result = await addWorkspace(newWorkspace);
      expect(result).toEqual(mockResponse);
      expect(mockedAxios.post).toHaveBeenCalledWith(`${API_URL}/Workspaces/add`, {
        title: newWorkspace.title,
        description: newWorkspace.description,
        organizationId: newWorkspace.organizationId,
        collections: newWorkspace.collections
      });
    });

    it('handles errors when adding a workspace', async () => {
      const error = new Error('Invalid workspace data');
      mockedAxios.post.mockRejectedValueOnce(error);

      const result = await addWorkspace(newWorkspace);
      expect(result).toBeNull();
    });
  });

  describe('updateWorkspace', () => {
    const updatedWorkspace: Workspace = {
      id: 1,
      title: 'Updated Workspace',
      description: 'Updated description',
      organizationId: 1,
      icon: '',
      collections: []
    };

    it('updates a workspace successfully', async () => {
      mockedAxios.patch.mockResolvedValueOnce({ data: { content: updatedWorkspace, statusCode: 200 } });

      const result = await updateWorkspace(updatedWorkspace);
      expect(result).toEqual(updatedWorkspace);
      expect(mockedAxios.patch).toHaveBeenCalledWith(`${API_URL}/Workspaces/update`, {
        id: updatedWorkspace.id,
        title: updatedWorkspace.title,
        description: updatedWorkspace.description,
        organizationId: updatedWorkspace.organizationId,
        collections: updatedWorkspace.collections
      });
    });

    it('handles errors when updating a workspace', async () => {
      const error = new Error('Workspace not found');
      mockedAxios.patch.mockRejectedValueOnce(error);

      const result = await updateWorkspace(updatedWorkspace);
      expect(result).toBeNull();
    });
  });

  describe('deleteWorkspace', () => {
    it('deletes a workspace successfully', async () => {
      mockedAxios.delete.mockResolvedValueOnce({ data: { statusCode: 200 } });

      const result = await deleteWorkspace(1);
      expect(result).toBe(true);
      expect(mockedAxios.delete).toHaveBeenCalledWith(`${API_URL}/Workspaces/delete`, { params: { id: 1 } });
    });

    it('handles errors when deleting a workspace', async () => {
      const error = new Error('Workspace not found');
      mockedAxios.delete.mockRejectedValueOnce(error);

      const result = await deleteWorkspace(999);
      expect(result).toBe(false);
    });
  });
}); 