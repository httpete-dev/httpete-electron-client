'use client'

import React, { useState } from 'react'
import { ChevronRight, ChevronDown, File, Folder, Globe } from 'lucide-react'
import { Collection, Doc } from '@/model'

export type DocFileTreeProps = {
  collections?: Collection[];
  data: Doc[];
  activeDocument?: Doc;
  onSelect?: (doc: Doc) => void;
}

const DocFileTree = ({ collections = [], data = [], activeDocument, onSelect }: DocFileTreeProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderId]: !prev[folderId]
    }));
  };

  const renderDocItem = (doc: Doc, level = 0) => {
    if (!doc) return null;
    
    const isFolder = doc.type === 'folder';
    const isExpanded = expandedFolders[doc.id?.toString() ?? ''];
    const isActive = activeDocument?.id === doc.id;

    return (
      <div key={doc.id} style={{ paddingLeft: `${level * 16}px` }}>
        <div 
          className={`flex items-center p-1 hover:bg-gray-700 rounded cursor-pointer ${isActive ? 'bg-gray-600' : ''}`}
          onClick={() => {
            if (isFolder) {
              toggleFolder(doc.id?.toString() ?? '');
            } else if (onSelect) {
              onSelect(doc);
            }
          }}
        >
          {isFolder ? (
            <>
              {isExpanded ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
              <Folder className="w-4 h-4 mr-2" />
            </>
          ) : (
            <File className="w-4 h-4 mr-2" />
          )}
          <span className="text-sm">{doc.title}</span>
        </div>
        {isFolder && isExpanded && doc.children?.map(child => renderDocItem(child, level + 1))}
      </div>
    );
  };

  const renderCollectionDocs = () => {
    if (!collections?.length) return null;

    return collections.map(collection => {
      const isExpanded = expandedFolders[`collection-${collection.id}`];
      
      return (
        <div key={collection.id}>
          <div 
            className="flex items-center p-1 hover:bg-gray-700 rounded cursor-pointer mt-2"
            onClick={() => toggleFolder(`collection-${collection.id}`)}
          >
            {isExpanded ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />}
            <Globe className="w-4 h-4 mr-2" />
            <span className="text-sm font-medium">{collection.name}</span>
          </div>
          {isExpanded && collection.endpoints?.map(endpoint => {
            if (!endpoint.documentation) return null;
            
            return (
              <div key={endpoint.id} className="ml-6">
                <div className="text-xs text-gray-400 mb-1">
                  [{endpoint.method}] {endpoint.url}
                </div>
                {renderDocItem(endpoint.documentation, 1)}
              </div>
            );
          })}
        </div>
      );
    });
  };

  return (
    <div className="space-y-1">
      {/* General Documentation */}
      {data.map(doc => renderDocItem(doc))}
      
      {/* Collection Documentation */}
      {collections && collections.length > 0 && (
        <div className="mt-6 pt-4 border-t border-gray-700">
          <h3 className="text-sm font-medium mb-2 text-gray-400">Collection Documentation</h3>
          {renderCollectionDocs()}
        </div>
      )}
    </div>
  );
};

export default DocFileTree;

