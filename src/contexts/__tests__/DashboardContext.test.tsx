import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { DashboardContext, DashboardContextType } from '../DashboardContext';
import { fallbackEndpoint, fallbackCollection } from '@/types';
import type { Workspace } from '@/types/workspace';

const mockWorkspace: Workspace = {
  id: 1,
  title: 'Test Workspace',
  description: 'Test Description',
  organizationId: 1,
  icon: 'test-icon',
  collections: [fallbackCollection]
};

describe('DashboardContext', () => {
  it('provides default values', () => {
    let contextValues: DashboardContextType | undefined;
    
    const TestComponent = () => {
      contextValues = React.useContext(DashboardContext);
      return null;
    };

    render(
      <DashboardContext.Provider value={{
        activeWorkspace: mockWorkspace,
        setActiveWorkspace: () => {},
        activeCollection: mockWorkspace.collections![0],
        setActiveCollection: () => {},
        activeEndpoint: fallbackEndpoint,
        setActiveEndpoint: () => {},
        baseUrls: [],
        setBaseUrls: () => {},
        isLoading: false,
        setIsLoading: () => {},
      }}>
        <TestComponent />
      </DashboardContext.Provider>
    );

    expect(contextValues).toEqual({
      activeWorkspace: mockWorkspace,
      setActiveWorkspace: expect.any(Function),
      activeCollection: mockWorkspace.collections![0],
      setActiveCollection: expect.any(Function),
      activeEndpoint: fallbackEndpoint,
      setActiveEndpoint: expect.any(Function),
      baseUrls: [],
      setBaseUrls: expect.any(Function),
      isLoading: false,
      setIsLoading: expect.any(Function),
    });
  });

  it('updates values through setters', () => {
    let contextValues: DashboardContextType | undefined;
    
    const TestComponent = () => {
      contextValues = React.useContext(DashboardContext);
      return null;
    };

    const mockSetActiveWorkspace = jest.fn();
    const mockSetActiveCollection = jest.fn();
    const mockSetActiveEndpoint = jest.fn();
    const mockSetBaseUrls = jest.fn();
    const mockSetIsLoading = jest.fn();

    render(
      <DashboardContext.Provider value={{
        activeWorkspace: mockWorkspace,
        setActiveWorkspace: mockSetActiveWorkspace,
        activeCollection: mockWorkspace.collections![0],
        setActiveCollection: mockSetActiveCollection,
        activeEndpoint: fallbackEndpoint,
        setActiveEndpoint: mockSetActiveEndpoint,
        baseUrls: [],
        setBaseUrls: mockSetBaseUrls,
        isLoading: false,
        setIsLoading: mockSetIsLoading,
      }}>
        <TestComponent />
      </DashboardContext.Provider>
    );

    act(() => {
      if (contextValues) {
        contextValues.setActiveWorkspace({ ...mockWorkspace, title: 'Updated Workspace' });
        contextValues.setActiveCollection({ ...mockWorkspace.collections![0], name: 'Updated Collection' });
        contextValues.setActiveEndpoint({ ...fallbackEndpoint, id: 1 });
        contextValues.setIsLoading(true);
      }
    });

    expect(mockSetActiveWorkspace).toHaveBeenCalledWith({ ...mockWorkspace, title: 'Updated Workspace' });
    expect(mockSetActiveCollection).toHaveBeenCalledWith({ ...mockWorkspace.collections![0], name: 'Updated Collection' });
    expect(mockSetActiveEndpoint).toHaveBeenCalledWith({ ...fallbackEndpoint, id: 1 });
    expect(mockSetIsLoading).toHaveBeenCalledWith(true);
  });
}); 