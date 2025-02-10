import { getCollection, addCollection, updateCollection, deleteCollection } from '../collections';
import axios from 'axios';
import { Collection } from '@/types';
import { API_URL } from '@/model';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('collections API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getCollection', () => {
    it('fetches collection successfully', async () => {
      const mockData = {
        id: 1,
        name: 'Collection 1',
        workspaceId: 1,
        description: '',
        icon: '',
        organizationId: 1,
        endpoints: []
      };
      mockedAxios.get.mockResolvedValueOnce({ data: { content: mockData, statusCode: 200 } });

      const result = await getCollection(1);
      expect(result).toEqual(mockData);
      expect(mockedAxios.get).toHaveBeenCalledWith(`${API_URL}/Collections/${1}`);
    });

    it('handles errors when fetching collection', async () => {
      const error = new Error('Network error');
      mockedAxios.get.mockRejectedValueOnce(error);

      const result = await getCollection(1);
      expect(result).toBeNull();
    });
  });

  describe('addCollection', () => {
    const newCollection: Collection = {
      name: 'New Collection',
      description: 'Test collection',
      workspaceId: 1,
      organizationId: 1,
      icon: '',
      endpoints: []
    };

    it('creates a collection successfully', async () => {
      const mockResponse = { id: 1, ...newCollection };
      mockedAxios.post.mockResolvedValueOnce({ data: { content: mockResponse, statusCode: 200 } });

      const result = await addCollection(newCollection);
      expect(result).toEqual(mockResponse);
      expect(mockedAxios.post).toHaveBeenCalledWith(`${API_URL}/Collections/add`, {
        name: newCollection.name,
        description: newCollection.description,
        icon: newCollection.icon,
        organizationId: newCollection.organizationId,
        workspaceId: newCollection.workspaceId,
        endpoints: newCollection.endpoints
      });
    });

    it('handles errors when creating a collection', async () => {
      const error = new Error('Invalid collection data');
      mockedAxios.post.mockRejectedValueOnce(error);

      const result = await addCollection(newCollection);
      expect(result).toBeNull();
    });
  });

  describe('updateCollection', () => {
    const updatedCollection: Collection = {
      id: 1,
      name: 'Updated Collection',
      description: 'Updated description',
      workspaceId: 1,
      organizationId: 1,
      icon: '',
      endpoints: []
    };

    it('updates a collection successfully', async () => {
      mockedAxios.patch.mockResolvedValueOnce({ data: { content: updatedCollection, statusCode: 200 } });

      const result = await updateCollection(updatedCollection);
      expect(result).toEqual(updatedCollection);
      expect(mockedAxios.patch).toHaveBeenCalledWith(`${API_URL}/Collections/update`, {
        id: updatedCollection.id,
        name: updatedCollection.name,
        description: updatedCollection.description,
        icon: updatedCollection.icon,
        organizationId: updatedCollection.organizationId,
        workspaceId: updatedCollection.workspaceId,
        endpoints: updatedCollection.endpoints
      });
    });

    it('handles errors when updating a collection', async () => {
      const error = new Error('Collection not found');
      mockedAxios.patch.mockRejectedValueOnce(error);

      const result = await updateCollection(updatedCollection);
      expect(result).toBeNull();
    });
  });

  describe('deleteCollection', () => {
    it('deletes a collection successfully', async () => {
      mockedAxios.delete.mockResolvedValueOnce({ data: { statusCode: 200 } });

      const result = await deleteCollection(1);
      expect(result).toBe(true);
      expect(mockedAxios.delete).toHaveBeenCalledWith(`${API_URL}/Collections/delete`, { params: { id: 1 } });
    });

    it('handles errors when deleting a collection', async () => {
      const error = new Error('Collection not found');
      mockedAxios.delete.mockRejectedValueOnce(error);

      const result = await deleteCollection(999);
      expect(result).toBe(false);
    });
  });
}); 