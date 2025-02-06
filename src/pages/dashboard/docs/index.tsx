'use client'
import DocFileTree from "@/components/DocFileTree";
import MarkdownEditor from "@/components/markdown-editor";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Doc, DocsPageProps } from "@/model";
import { Book } from 'lucide-react'
import { useEffect, useState } from "react";
import { defaultGeneralDocs, fallbackDoc } from "@/layouts/DashboardLayout";

// Extended Doc type to include collection-specific properties
type CollectionDoc = Doc & {
    collectionId?: number;
    endpointId?: number;
};

// Type guard to check if a value is a CollectionDoc
function isCollectionDoc(doc: any): doc is CollectionDoc {
    return doc !== null && 
           typeof doc === 'object' && 
           'id' in doc && 
           'type' in doc && 
           'title' in doc && 
           'text' in doc;
}

// Mock data (in a real application, this would come from an API)
const recentlyUpdated = [
    {
        id: 1,
        title: 'Getting Started with HttPete',
        text: '# Getting Started with HttPete\n\nWelcome to HttPete! This guide will walk you through the basics of using our platform for API testing and documentation.\n\n## Setting up your first project\n\n1. Log in to your HttPete account\n2. Click on "New Project" in the dashboard\n3. Give your project a name and description\n4. Start adding API endpoints\n\n## Creating your first API test\n\n1. In your project, click "New Test"\n2. Enter the API endpoint URL\n3. Select the HTTP method (GET, POST, etc.)\n4. Add any necessary headers or parameters\n5. Click "Send" to run the test\n\n## Documenting your API\n\n1. After running a successful test, click "Generate Docs"\n2. HttPete will automatically create a documentation template\n3. Edit the generated content to add more details\n4. Use markdown to format your documentation\n\nCongratulations! You\'ve now created your first API test and documentation in HttPete. Explore more features to get the most out of our platform.',
        updatedBy: 'David Silva',
        updated: new Date('2024-11-25T10:34:04.2345')
    },
    {
        id: 2,
        title: 'Advanced API Testing Techniques',
        text: '# Advanced API Testing Techniques\n\nThis guide covers advanced techniques for API testing in HttPete.\n\n## Using environment variables\n\nEnvironment variables allow you to reuse values across multiple tests.\n\n1. Go to "Environment Settings"\n2. Add key-value pairs for your variables\n3. Use `{{variable_name}}` in your tests to reference these variables\n\n## Chaining API requests\n\nYou can use the response from one API call in subsequent requests.\n\n1. Create a new test\n2. In the "Pre-request Script" tab, add code to extract data from a previous response\n3. Use this data in your current request\n\n## Writing test scripts\n\nTest scripts allow you to automate assertions on your API responses.\n\n1. In the "Tests" tab of your request\n2. Write JavaScript to assert expected values\n3. Use the `pm` object to access response data and make assertions\n\nExample:\n```javascript\npm.test("Status code is 200", function () {\n    pm.response.to.have.status(200);\n});\n```\n\nMaster these techniques to become an API testing expert with HttPete!',
        updatedBy: 'David Silva',
        updated: new Date('2024-11-25T10:34:04.2345')
    },
    {
        id: 3,
        title: 'Advanced API Testing Techniques',
        text: '# Advanced API Testing Techniques\n\nThis guide covers advanced techniques for API testing in HttPete.\n\n## Using environment variables\n\nEnvironment variables allow you to reuse values across multiple tests.\n\n1. Go to "Environment Settings"\n2. Add key-value pairs for your variables\n3. Use `{{variable_name}}` in your tests to reference these variables\n\n## Chaining API requests\n\nYou can use the response from one API call in subsequent requests.\n\n1. Create a new test\n2. In the "Pre-request Script" tab, add code to extract data from a previous response\n3. Use this data in your current request\n\n## Writing test scripts\n\nTest scripts allow you to automate assertions on your API responses.\n\n1. In the "Tests" tab of your request\n2. Write JavaScript to assert expected values\n3. Use the `pm` object to access response data and make assertions\n\nExample:\n```javascript\npm.test("Status code is 200", function () {\n    pm.response.to.have.status(200);\n});\n```\n\nMaster these techniques to become an API testing expert with HttPete!',
        updatedBy: 'David Silva',
        updated: new Date('2024-11-25T10:34:04.2345')
    },
    {
        id: 3,
        title: 'Advanced API Testing Techniques',
        text: '# Advanced API Testing Techniques\n\nThis guide covers advanced techniques for API testing in HttPete.\n\n## Using environment variables\n\nEnvironment variables allow you to reuse values across multiple tests.\n\n1. Go to "Environment Settings"\n2. Add key-value pairs for your variables\n3. Use `{{variable_name}}` in your tests to reference these variables\n\n## Chaining API requests\n\nYou can use the response from one API call in subsequent requests.\n\n1. Create a new test\n2. In the "Pre-request Script" tab, add code to extract data from a previous response\n3. Use this data in your current request\n\n## Writing test scripts\n\nTest scripts allow you to automate assertions on your API responses.\n\n1. In the "Tests" tab of your request\n2. Write JavaScript to assert expected values\n3. Use the `pm` object to access response data and make assertions\n\nExample:\n```javascript\npm.test("Status code is 200", function () {\n    pm.response.to.have.status(200);\n});\n```\n\nMaster these techniques to become an API testing expert with HttPete!',
        updatedBy: 'David Silva',
        updated: new Date('2024-11-25T10:34:04.2345')
    },
    {
        id: 3,
        title: 'Advanced API Testing Techniques',
        text: '# Advanced API Testing Techniques\n\nThis guide covers advanced techniques for API testing in HttPete.\n\n## Using environment variables\n\nEnvironment variables allow you to reuse values across multiple tests.\n\n1. Go to "Environment Settings"\n2. Add key-value pairs for your variables\n3. Use `{{variable_name}}` in your tests to reference these variables\n\n## Chaining API requests\n\nYou can use the response from one API call in subsequent requests.\n\n1. Create a new test\n2. In the "Pre-request Script" tab, add code to extract data from a previous response\n3. Use this data in your current request\n\n## Writing test scripts\n\nTest scripts allow you to automate assertions on your API responses.\n\n1. In the "Tests" tab of your request\n2. Write JavaScript to assert expected values\n3. Use the `pm` object to access response data and make assertions\n\nExample:\n```javascript\npm.test("Status code is 200", function () {\n    pm.response.to.have.status(200);\n});\n```\n\nMaster these techniques to become an API testing expert with HttPete!',
        updatedBy: 'David Silva',
        updated: new Date('2024-11-25T10:34:04.2345')
    },
] as Doc[]


const defaultDocTitle = "New Document";
const itemsPerPage = 1


const DocumentsPage = (props: DocsPageProps) => {
    const [selectedDoc, setSelectedDoc] = useState<CollectionDoc>(fallbackDoc);
    const [documentType, setDocumentType] = useState<'general' | 'collection'>('general');
    const [isDocumentChanged, setIsDocumentChanged] = useState(false);

    // Get all collection documents
    const collectionDocs: CollectionDoc[] = props.activeWorkspace?.collections?.flatMap(collection => 
        collection.endpoints?.map(endpoint => {
            if (endpoint?.documentation) {
                const doc: CollectionDoc = {
                    ...endpoint.documentation,
                    collectionId: collection.id,
                    endpointId: endpoint.id
                };
                return doc;
            }
            return null;
        })
    ).filter(isCollectionDoc) ?? [];

    // Use general docs as default, or the ones from props if available
    const generalDocs = props.docs?.length > 0 ? props.docs : defaultGeneralDocs;

    const handleDocumentSelect = (doc: CollectionDoc) => {
        setSelectedDoc(doc);
        setDocumentType(doc.collectionId ? 'collection' : 'general');
        
        if (doc.collectionId && doc.endpointId) {
            const endpoint = props.activeWorkspace?.collections
                ?.find(c => c.id === doc.collectionId)
                ?.endpoints?.find(e => e.id === doc.endpointId);
            if (endpoint) {
                props.setActiveEndpoint(endpoint);
            }
        }
    };

    const handleDocumentChange = (newText: string) => {
        setIsDocumentChanged(true);
        if (documentType === 'general') {
            // Update general documentation
            const updatedDoc = { ...selectedDoc, text: newText };
            props.setActiveDocumentation(updatedDoc);
        } else {
            // Update collection documentation
            if (props.activeEndpoint && props.activeEndpoint.documentation) {
                props.activeEndpoint.documentation.text = newText;
                props.setActiveEndpoint({ ...props.activeEndpoint });
            }
        }
    };

    return <DashboardLayout sidebarType="none">
        
        <main className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
            <div className="mx-auto mt-8 px-4 sm:px-6 lg:px-8" style={{width:'100%'}}>
                <div className="grid grid-cols-8 gap-8">
                    <div className='col-span-2'>
            
                        <section className="bg-gray-800 p-6 rounded-lg mb-8" style={{maxHeight:'40vh', overflowY:'auto', overflowX:'hidden'}}>
                            <h2 className="text-xl font-bold mb-4">General Documentation</h2>
                            <DocFileTree 
                                data={generalDocs}
                                onSelect={handleDocumentSelect}
                                activeDocument={documentType === 'general' ? selectedDoc : undefined}
                            />
                        </section>

                        <section className="bg-gray-800 p-6 rounded-lg" style={{maxHeight:'40vh', overflowY:'auto', overflowX:'hidden'}}>
                            <h2 className="text-xl font-bold mb-4">Collections</h2>
                            <DocFileTree 
                                collections={props.activeWorkspace?.collections} 
                                data={collectionDocs}
                                onSelect={handleDocumentSelect}
                                activeDocument={documentType === 'collection' ? selectedDoc : undefined}
                            />
                        </section>

                        {recentlyUpdated.length > 0 && 
            <div className="mb-12 items-center mt-8 m-auto" style={{width:'90%'}}>

                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Recently Updated</h2>
                </div>
                <div className="flex flex-wrap gap-4">
                    {recentlyUpdated.slice(0, 3).map((doc) => (
                        <button
                            key={doc?.id}
                            className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition duration-300 text-left"
                            style={{minWidth:'300px', maxWidth:'400px'}}
                            onClick={() => { }}//TODO: 
                        >
                            <div className="flex items-center">
                                <Book className="w-6 h-6 text-red-500 mr-2" />
                                <span>{doc?.title}</span>
                            </div>
                            <span className='text-gray-500'>Updated by {doc?.updatedBy} ({doc?.updated?.toDateString()})</span>
                        </button>
                    ))}
                </div>
            </div>}
                    </div>

                    <div className="col-span-6 max-h-fit">
                            <MarkdownEditor
                                isMobile={props.isMobile}
                                setDocumentChanged={setIsDocumentChanged}
                                setActiveEndpoint={props.setActiveEndpoint}
                                activeEndpoint={props.activeEndpoint}
                                activeDocument={selectedDoc}
                                setEditingTitle={props.setEditingTitle}
                                markdown={selectedDoc.text}
                                setMarkdown={handleDocumentChange}
                            />
                    </div>


                </div>
            </div>
        </main>
    </DashboardLayout>
}

export default DocumentsPage;