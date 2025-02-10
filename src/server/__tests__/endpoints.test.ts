import { getEndpoints, addEndpoint, updateEndpoint, deleteEndpoint } from '../endpoints';
import axios from 'axios';
import { fallbackEndpoint } from '@/types';
import { API_URL } from '@/model';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('endpoints API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getEndpoints', () => {
    it('fetches endpoints successfully', async () => {
      const mockData = [
        { ...fallbackEndpoint, id: 1, url: '/api/test1' },
        { ...fallbackEndpoint, id: 2, url: '/api/test2' }
      ];
      mockedAxios.get.mockResolvedValueOnce({ data: { content: mockData, statusCode: 200 } });

      const result = await getEndpoints({ collectionId: 1 });
      expect(result).toEqual(mockData);
      expect(mockedAxios.get).toHaveBeenCalledWith(`${API_URL}/Endpoints/get`, { params: { collectionId: 1 } });
    });

    it('handles errors when fetching endpoints', async () => {
      const error = new Error('Network error');
      mockedAxios.get.mockRejectedValueOnce(error);

      const result = await getEndpoints({ collectionId: 1 });
      expect(result).toEqual([]);
    });
  });

  describe('addEndpoint', () => {
    const newEndpoint = {
      ...fallbackEndpoint,
      url: '/api/test',
      method: 'GET' as const,
      collectionId: 1
    };

    it('adds an endpoint successfully', async () => {
      const mockResponse = { id: 1, ...newEndpoint };
      mockedAxios.post.mockResolvedValueOnce({ data: { content: mockResponse, statusCode: 200 } });

      const result = await addEndpoint(newEndpoint);
      expect(result).toEqual(mockResponse);
      expect(mockedAxios.post).toHaveBeenCalledWith(`${API_URL}/Endpoints/add`, {
        url: newEndpoint.url,
        headers: newEndpoint.headers,
        method: newEndpoint.method,
        baseUrl: {
          id: newEndpoint.baseUrl.id,
          workspaceId: newEndpoint.baseUrl.workspaceId,
          protocol: newEndpoint.baseUrl.protocol,
          value: newEndpoint.baseUrl.value
        },
        baseUrlId: newEndpoint.baseUrlId,
        body: newEndpoint.body,
        collectionId: newEndpoint.collectionId,
        workspaceId: newEndpoint.workspaceId,
        organizationId: newEndpoint.organizationId,
        documentation: {
          id: newEndpoint.documentation.id,
          organizationId: newEndpoint.documentation.organizationId,
          workspaceId: newEndpoint.documentation.workspaceId,
          parentId: newEndpoint.documentation.parentId,
          title: newEndpoint.documentation.title,
          text: newEndpoint.documentation.text,
          authorId: newEndpoint.documentation.authorId,
          lastEditById: newEndpoint.documentation.lastEditById,
          created: newEndpoint.documentation.created,
          lastEdited: newEndpoint.documentation.lastEdited,
          children: newEndpoint.documentation.children || [],
          endpointId: newEndpoint.documentation.endpointId
        }
      });
    });

    it('handles errors when adding an endpoint', async () => {
      const error = new Error('Invalid endpoint data');
      mockedAxios.post.mockRejectedValueOnce(error);

      const result = await addEndpoint(newEndpoint);
      expect(result).toBeNull();
    });
  });

  describe('updateEndpoint', () => {
    const updatedEndpoint = {
      ...fallbackEndpoint,
      id: 1,
      url: '/api/updated',
      method: 'POST' as const
    };

    it('updates an endpoint successfully', async () => {
      mockedAxios.patch.mockResolvedValueOnce({ data: { content: updatedEndpoint, statusCode: 200 } });

      const result = await updateEndpoint(updatedEndpoint);
      expect(result).toEqual(updatedEndpoint);
      expect(mockedAxios.patch).toHaveBeenCalledWith(`${API_URL}/Endpoints/update`, {
        id: updatedEndpoint.id,
        url: updatedEndpoint.url,
        headers: updatedEndpoint.headers,
        method: updatedEndpoint.method,
        baseUrl: {
          id: updatedEndpoint.baseUrl.id,
          workspaceId: updatedEndpoint.baseUrl.workspaceId,
          protocol: updatedEndpoint.baseUrl.protocol,
          value: updatedEndpoint.baseUrl.value
        },
        baseUrlId: updatedEndpoint.baseUrlId,
        body: updatedEndpoint.body,
        collectionId: updatedEndpoint.collectionId,
        workspaceId: updatedEndpoint.workspaceId,
        organizationId: updatedEndpoint.organizationId,
        documentation: {
          id: updatedEndpoint.documentation.id,
          organizationId: updatedEndpoint.documentation.organizationId,
          workspaceId: updatedEndpoint.documentation.workspaceId,
          parentId: updatedEndpoint.documentation.parentId,
          title: updatedEndpoint.documentation.title,
          text: updatedEndpoint.documentation.text,
          authorId: updatedEndpoint.documentation.authorId,
          lastEditById: updatedEndpoint.documentation.lastEditById,
          created: updatedEndpoint.documentation.created,
          lastEdited: updatedEndpoint.documentation.lastEdited,
          children: updatedEndpoint.documentation.children || [],
          endpointId: updatedEndpoint.documentation.endpointId
        }
      });
    });

    it('handles errors when updating an endpoint', async () => {
      const error = new Error('Endpoint not found');
      mockedAxios.patch.mockRejectedValueOnce(error);

      const result = await updateEndpoint(updatedEndpoint);
      expect(result).toBeNull();
    });
  });

  describe('deleteEndpoint', () => {
    it('deletes an endpoint successfully', async () => {
      mockedAxios.delete.mockResolvedValueOnce({ data: { statusCode: 200 } });

      const result = await deleteEndpoint(1);
      expect(result).toBe(true);
      expect(mockedAxios.delete).toHaveBeenCalledWith(`${API_URL}/Endpoints/delete`, { params: { id: 1 } });
    });

    it('handles errors when deleting an endpoint', async () => {
      const error = new Error('Endpoint not found');
      mockedAxios.delete.mockRejectedValueOnce(error);

      const result = await deleteEndpoint(999);
      expect(result).toBe(false);
    });
  });
}); 