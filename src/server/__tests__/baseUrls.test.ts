import { getBaseUrls, addBaseUrl, updateBaseUrl, deleteBaseUrl } from '../baseUrls';
import axios from 'axios';
import { API_URL } from '@/model';
import { BaseUrl } from '@/types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('baseUrls API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getBaseUrls', () => {
    it('fetches base URLs successfully', async () => {
      const mockData = [
        { id: 1, value: 'http://api1.example.com', workspaceId: 1 },
        { id: 2, value: 'http://api2.example.com', workspaceId: 1 }
      ];
      mockedAxios.get.mockResolvedValueOnce({ data: { content: mockData, statusCode: 200 } });

      const result = await getBaseUrls(1);
      expect(result).toEqual(mockData);
      expect(mockedAxios.get).toHaveBeenCalledWith(`${API_URL}/BaseUrls/get`, { params: { workspaceId: 1 } });
    });

    it('handles errors when fetching base URLs', async () => {
      const error = new Error('Network error');
      mockedAxios.get.mockRejectedValueOnce(error);

      const result = await getBaseUrls(1);
      expect(result).toEqual([]);
    });
  });

  describe('addBaseUrl', () => {
    const newBaseUrl: BaseUrl = {
      value: 'http://api3.example.com',
      workspaceId: 1,
      protocol: 'HTTPS'
    };

    it('adds a base URL successfully', async () => {
      const mockResponse = { id: 3, ...newBaseUrl };
      mockedAxios.post.mockResolvedValueOnce({ data: { content: mockResponse, statusCode: 200 } });

      const result = await addBaseUrl(newBaseUrl);
      expect(result).toEqual(mockResponse);
      expect(mockedAxios.post).toHaveBeenCalledWith(`${API_URL}/BaseUrls/add`, newBaseUrl);
    });

    it('handles errors when adding a base URL', async () => {
      const error = new Error('Invalid URL');
      mockedAxios.post.mockRejectedValueOnce(error);

      const result = await addBaseUrl({ ...newBaseUrl, value: 'invalid-url' });
      expect(result).toBeNull();
    });
  });

  describe('updateBaseUrl', () => {
    const updatedBaseUrl: BaseUrl = {
      id: 1,
      value: 'http://updated.example.com',
      workspaceId: 1,
      protocol: 'HTTPS'
    };

    it('updates a base URL successfully', async () => {
      mockedAxios.patch.mockResolvedValueOnce({ data: { content: updatedBaseUrl, statusCode: 200 } });

      const result = await updateBaseUrl(updatedBaseUrl);
      expect(result).toEqual(updatedBaseUrl);
      expect(mockedAxios.patch).toHaveBeenCalledWith(`${API_URL}/BaseUrls/update`, updatedBaseUrl);
    });

    it('handles errors when updating a base URL', async () => {
      const error = new Error('Base URL not found');
      mockedAxios.patch.mockRejectedValueOnce(error);

      const result = await updateBaseUrl(updatedBaseUrl);
      expect(result).toBeNull();
    });
  });

  describe('deleteBaseUrl', () => {
    it('deletes a base URL successfully', async () => {
      mockedAxios.delete.mockResolvedValueOnce({ data: { statusCode: 200 } });

      const result = await deleteBaseUrl(1);
      expect(result).toBe(true);
      expect(mockedAxios.delete).toHaveBeenCalledWith(`${API_URL}/BaseUrls/delete`, { params: { id: 1 } });
    });

    it('handles errors when deleting a base URL', async () => {
      const error = new Error('Base URL not found');
      mockedAxios.delete.mockRejectedValueOnce(error);

      const result = await deleteBaseUrl(999);
      expect(result).toBe(false);
    });
  });
}); 