import { RequestManager } from '../request';
import { Endpoint, BaseUrl } from '@/types';
import axios, { AxiosStatic } from 'axios';

jest.mock('axios');
const mockedAxios = jest.mocked(axios);

describe('RequestManager', () => {
  const mockBaseUrl: BaseUrl = {
    id: 1,
    workspaceId: 1,
    protocol: 'HTTPS',
    value: 'api.example.com'
  };

  const mockEndpoint: Endpoint = {
    id: 1,
    url: '/test',
    headers: '{"Content-Type": "application/json"}',
    method: 'GET',
    baseUrl: mockBaseUrl,
    baseUrlId: 1,
    body: '{}',
    collectionId: 1,
    workspaceId: 1,
    organizationId: 1,
    documentation: { id: 1 }
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with endpoint data', () => {
    const manager = new RequestManager(mockEndpoint);
    const state = manager.getCurrentState();
    const originalState = manager.getOriginalState();

    expect(state).toEqual({
      method: 'GET',
      protocol: 'HTTPS',
      baseUrl: mockBaseUrl,
      url: '/test',
      headers: '{"Content-Type": "application/json"}',
      body: '{}'
    });

    expect(originalState).toEqual(state);
  });

  it('should track changes correctly', () => {
    const manager = new RequestManager(mockEndpoint);
    
    // Initially no changes
    expect(manager.hasChanges()).toBe(false);

    // Update state
    manager.updateState({
      method: 'POST',
      body: '{"data": "test"}'
    });

    // Should detect changes
    expect(manager.hasChanges()).toBe(true);

    const currentState = manager.getCurrentState();
    expect(currentState.method).toBe('POST');
    expect(currentState.body).toBe('{"data": "test"}');

    // Original state should remain unchanged
    const originalState = manager.getOriginalState();
    expect(originalState.method).toBe('GET');
    expect(originalState.body).toBe('{}');
  });

  it('should reset changes correctly', () => {
    const manager = new RequestManager(mockEndpoint);
    
    // Make some changes
    manager.updateState({
      method: 'POST',
      body: '{"data": "test"}'
    });
    
    expect(manager.hasChanges()).toBe(true);

    // Reset changes
    manager.resetToOriginal();
    
    expect(manager.hasChanges()).toBe(false);
    expect(manager.getCurrentState()).toEqual(manager.getOriginalState());
  });

  it('should commit changes correctly', () => {
    const manager = new RequestManager(mockEndpoint);
    
    // Make some changes
    manager.updateState({
      method: 'POST',
      body: '{"data": "test"}'
    });
    
    expect(manager.hasChanges()).toBe(true);

    // Commit changes
    manager.commitChanges();
    
    expect(manager.hasChanges()).toBe(false);
    expect(manager.getOriginalState()).toEqual(manager.getCurrentState());
  });

  it('should send GET request correctly', async () => {
    const manager = new RequestManager(mockEndpoint);
    const mockResponse = { data: { test: true } };
    mockedAxios.mockResolvedValueOnce(mockResponse);

    const result = await manager.sendRequest();

    expect(mockedAxios).toHaveBeenCalledWith({
      method: 'GET',
      url: 'https://api.example.com/test',
      headers: { 'Content-Type': 'application/json' },
      data: undefined
    });

    expect(result.response).toBe(mockResponse);
    expect(result.error).toBeNull();
    expect(result.loading).toBe(false);
  });

  it('should send POST request with body', async () => {
    const manager = new RequestManager({
      ...mockEndpoint,
      method: 'POST',
      body: '{"data": "test"}'
    });
    
    const mockResponse = { data: { success: true } };
    mockedAxios.mockResolvedValueOnce(mockResponse);

    const result = await manager.sendRequest();

    expect(mockedAxios).toHaveBeenCalledWith({
      method: 'POST',
      url: 'https://api.example.com/test',
      headers: { 'Content-Type': 'application/json' },
      data: { data: 'test' }
    });

    expect(result.response).toBe(mockResponse);
    expect(result.error).toBeNull();
    expect(result.loading).toBe(false);
  });

  it('should handle request errors', async () => {
    const manager = new RequestManager(mockEndpoint);
    const mockError = new Error('Network error');
    mockedAxios.mockRejectedValueOnce(mockError);

    const result = await manager.sendRequest();

    expect(result.response).toBeNull();
    expect(result.error).toBe(mockError);
    expect(result.loading).toBe(false);
  });
}); 