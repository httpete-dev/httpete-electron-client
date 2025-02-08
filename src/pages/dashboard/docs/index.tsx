'use client'
import DocFileTree from "@/components/DocFileTree";
import MarkdownEditor from "@/components/markdown-editor";
import DashboardLayout from "@/layouts/DashboardLayout";
import { Book } from 'lucide-react'
import { useEffect, useState } from "react";
import { 
    DocsPageProps, 
    EndpointDocumentation, 
    GeneralDocument, 
    mockGeneralDocs, 
    mockRecentlyUpdated,
    fallbackEndpointDoc,
    fallbackGeneralDoc, 
    fallbackWorkspace
} from "@/types";

const DocumentsPage = (props: DocsPageProps) => {
    // Initialize with appropriate fallback based on the active documentation type
    const [selectedDoc, setSelectedDoc] = useState<GeneralDocument | EndpointDocumentation>(
        props.activeDocumentation ?? fallbackGeneralDoc
    );
    const [documentType, setDocumentType] = useState<'general' | 'endpoint'>(
        'type' in (props.activeDocumentation ?? {}) && props.activeDocumentation?.type === 'endpoint' 
            ? 'endpoint' 
            : 'general'
    );
    const [isDocumentChanged, setIsDocumentChanged] = useState(false);

    // Get all endpoint documentation with proper null checks
    const endpointDocs: EndpointDocumentation[] = props.activeWorkspace?.collections?.flatMap(collection => 
        (collection?.endpoints ?? []).map(endpoint => {
            if (endpoint?.documentation) {
                return {
                    ...endpoint.documentation,
                    type: 'endpoint',
                    endpointId: endpoint.id ?? -1
                } as EndpointDocumentation;
            }
            return null;
        })
    ).filter((doc): doc is EndpointDocumentation => doc !== null) ?? [];

    // Use general docs as default, or the ones from props if available
    const generalDocs = props.docs?.length > 0 ? props.docs : mockGeneralDocs;

    // Update selected doc when active documentation changes
    useEffect(() => {
        if (props.activeDocumentation) {
            setSelectedDoc(props.activeDocumentation);
            setDocumentType(
                'type' in props.activeDocumentation && props.activeDocumentation.type === 'endpoint' 
                    ? 'endpoint' 
                    : 'general'
            );
        }
    }, [props.activeDocumentation]);

    const handleDocumentSelect = (doc: GeneralDocument | EndpointDocumentation) => {
        // If doc is null/undefined, use appropriate fallback based on the current document type
        const safeDoc = doc ?? (documentType === 'endpoint' ? fallbackEndpointDoc : fallbackGeneralDoc);
        setSelectedDoc(safeDoc);
        setDocumentType(safeDoc.type === 'endpoint' ? 'endpoint' : 'general');
        
        if (safeDoc.type === 'endpoint') {
            const endpoint = props.activeWorkspace?.collections
                ?.find(c => c.endpoints?.some(e => e.id === safeDoc.endpointId))
                ?.endpoints?.find(e => e.id === safeDoc.endpointId);
            if (endpoint) {
                props.setActiveEndpoint(endpoint);
            }
        }
    };

    const handleDocumentChange = (newText: string) => {
        setIsDocumentChanged(true);
        const safeText = newText ?? '';

        if (documentType === 'general') {
            // Update general documentation
            const updatedDoc = { 
                ...selectedDoc, 
                text: safeText,
                lastEdited: new Date()
            };
            props.setActiveDocumentation(updatedDoc);
        } else {
            // Update endpoint documentation
            if (props.activeEndpoint) {
                const updatedDoc = {
                    ...(props.activeEndpoint.documentation ?? fallbackEndpointDoc),
                    text: safeText,
                    type: 'endpoint' as const,
                    endpointId: props.activeEndpoint.id ?? -1,
                    lastEdited: new Date()
                };
                props.setActiveEndpoint({
                    ...props.activeEndpoint,
                    documentation: updatedDoc
                });
            }
        }
    };

    // Ensure we always have a valid document for the editor
    const editorDocument = selectedDoc ?? (documentType === 'endpoint' ? fallbackEndpointDoc : fallbackGeneralDoc);

    return (
        <DashboardLayout sidebarType="none">
            <main className="flex flex-col min-h-screen bg-gray-900 text-gray-100">
                <div className="mx-auto mt-8 px-4 sm:px-6 lg:px-8" style={{width:'100%'}}>
                    <div className="grid grid-cols-8 gap-8">
                        <div className='col-span-2'>
                            <section className="bg-gray-800 p-6 rounded-lg mb-8" style={{maxHeight:'40vh', overflowY:'auto', overflowX:'hidden'}}>
                                <h2 className="text-xl font-bold mb-4">General Documentation</h2>
                                <DocFileTree 
                                    data={generalDocs ?? []}
                                    onSelect={handleDocumentSelect}
                                    activeDocument={documentType === 'general' ? selectedDoc : undefined}
                                />
                            </section>

                            <section className="bg-gray-800 p-6 rounded-lg" style={{maxHeight:'40vh', overflowY:'auto', overflowX:'hidden'}}>
                                <h2 className="text-xl font-bold mb-4">Collections</h2>
                                <DocFileTree 
                                    collections={props.activeWorkspace?.collections ?? fallbackWorkspace.collections ?? []} 
                                    data={endpointDocs}
                                    onSelect={handleDocumentSelect}
                                    activeDocument={documentType === 'endpoint' ? selectedDoc : undefined}
                                />
                            </section>

                            {mockRecentlyUpdated.length > 0 && (
                                <div className="mb-12 items-center mt-8 m-auto" style={{width:'90%'}}>
                                    <div className="flex justify-between items-center mb-4">
                                        <h2 className="text-2xl font-bold">Recently Updated</h2>
                                    </div>
                                    <div className="flex flex-wrap gap-4">
                                        {mockRecentlyUpdated.slice(0, 3).map((doc) => (
                                            <button
                                                key={doc.id}
                                                className="bg-gray-800 p-4 rounded-lg hover:bg-gray-700 transition duration-300 text-left"
                                                style={{minWidth:'300px', maxWidth:'400px'}}
                                                onClick={() => handleDocumentSelect(doc)}
                                            >
                                                <div className="flex items-center">
                                                    <Book className="w-6 h-6 text-red-500 mr-2" />
                                                    <span>{doc.title}</span>
                                                </div>
                                                <span className='text-gray-500'>
                                                    Last edited by User {doc.lastEditById} ({doc.lastEdited.toDateString()})
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="col-span-6 max-h-fit">
                            <MarkdownEditor
                                isMobile={props.isMobile}
                                setDocumentChanged={setIsDocumentChanged}
                                setActiveEndpoint={props.setActiveEndpoint}
                                activeEndpoint={props.activeEndpoint}
                                activeDocument={editorDocument}
                                setEditingTitle={props.setEditingTitle}
                                markdown={editorDocument.text ?? ''}
                                setMarkdown={handleDocumentChange}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </DashboardLayout>
    );
};

export default DocumentsPage;