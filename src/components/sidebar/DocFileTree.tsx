'use client'

import React, { useState } from 'react'
import { ChevronRight, ChevronDown, File, Folder, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Collection, Doc } from '@/model'

interface DocFileTreeProps {
  data: Doc[],
  setActiveDocumentation: (doc: Doc) => void;
  collections: Collection[]
}
// Function to generate the default expanded state
const generateExpandedState = (node) => {
  const state = { [node?.id]: true }; // Default the current node to true
  if (node?.children) {
    node?.children.forEach((child) => {
      // Recursively build state for child nodes
      Object.assign(state, generateExpandedState(child));
    });
  }
  return state;
};

const DocFileTree: React.FC<DocFileTreeProps> = (props: DocFileTreeProps) => {
  const [expanded, setExpanded] = useState(generateExpandedState(props.data));
  const [hoveredId, setHoveredId] = useState<string | null>(null)

  const toggleExpand = (id: string) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleAddDocument = (parentId: string) => {
    // TODO: Implement the logic to add a new document
  }

  const renderTreeNode = (node: Doc) => {
    const isExpanded = expanded[node?.id] ?? true
    const isFolder = node.type === 'folder'

    return (
      <div key={node.id} className="ml-4 w-full">
        <div 
          className="flex items-center py-1 cursor-pointer group"
          onMouseEnter={() => setHoveredId(node?.id.toString())}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => {props.setActiveDocumentation(node)}}
        >
          {isFolder && (
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 mr-1 text-white"
              onClick={() => toggleExpand(node?.id.toString())}
            >
              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            </Button>
          )}
          {isFolder ? <Folder size={16} className="mr-2 text-white" /> 
          : <File size={16} className="mr-2 text-white" />}
          <span className="text-sm text-gray-200">{node.title}</span>
          {parseInt(hoveredId ?? "-1") === node?.id && (
            <Button
              className="h-4 w-4 bg-transparent hover:bg-transparent 
                hover:text-white ml-2 text-gray-400 opacity-0 
                group-hover:opacity-100 transition-opacity "
              onClick={() => handleAddDocument(node?.id.toString())}
            >
              <Plus size={12} />
            </Button>
          )}
        </div>
        {isFolder && isExpanded && node?.children && (
          <div className="ml-4">
            {node?.children?.map(childNode => renderTreeNode(childNode))}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg w-full">
      <h4 className="text-xl font-bold mb-4">General Documentation</h4>
      {props.data?.map(node => renderTreeNode(node))}
      <h5 className="font-bold mt-8">Collections</h5>
      {props.collections?.map(x=> {
        return <div className='mt-0' key={x.id}>
          <h6 className="font-bold mb-0">{x.name}</h6>
          <div className='border-2 p-4 border-gray-600 rounded-lg m-2'>

          <h6 className="font-bold mb-0">Endpoints</h6>
          {x.endpoints?.map(endpoint => 
            <>
            <p className='mt-2'>
              <span>[{endpoint?.method}]</span>{" "}<span>{endpoint?.url}</span></p>
            {renderTreeNode(endpoint?.documentation)}
            </>
          )}
          </div>
        </div>
      })}
    </div>
  )
}

export default DocFileTree

