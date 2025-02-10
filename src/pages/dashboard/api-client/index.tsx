'use client'

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Send, Save, Plus, Eye, EyeOff } from 'lucide-react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import dynamic from "next/dynamic"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism"
import { useRouter, useSearchParams } from 'next/navigation'
import axios from "axios"
import { prettifyJson } from "@/lib/utils"
import MarkdownEditor from "@/components/markdown-editor"
import { addBaseUrl } from "@/server/baseUrls"
import ManageBaseUrlsDialog from "@/components/api-client/ManageBaseUrlsDialog"
import EnvironmentVariables from "@/components/api-client/EnvironmentVariables"
import WysiwygEditor from "@/components/documentation/WYSIYYGEditor"
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: true });
import { LoadingSpinner, LoadingWrapper, ErrorBoundary } from '@/components/common';
import TestsForEndpoint from "@/components/TestsForEndpoint"
import { useIsMobile } from "@/hooks/use-mobile"
import { useDashboard } from "@/contexts/DashboardContext"
import DashboardLayout from "@/layouts/DashboardLayout"
import { fallbackBaseUrl, fallbackEndpoint } from "@/types"
import "@/styles/documentation.scss"
import { toast, handleError } from "@/lib/utils/toast"
import { RequestManager } from '@/model/request';
import { BaseUrl } from '@/types';

const styles = {
    loadingAnimation: {
        animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    },
}

const ApiClientPage = () => {
    const { 
        activeWorkspace,
        activeEndpoint,
        setActiveEndpoint,
        baseUrls,
        isLoading,
        setIsLoading 
    } = useDashboard();

    const [responseData, setResponseData] = useState("")
    const [requestManager, setRequestManager] = useState<RequestManager | null>(null);
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false)
    const [isUnsavedChangesDialogOpen, setIsUnsavedChangesDialogOpen] = useState(false)
    const workspaceNameInputRef = useRef<HTMLInputElement>(null)
    const [isNewWorkspaceModalOpen, setIsNewWorkspaceModalOpen] = useState(false)
    const [editingDoc, setEditingDoc] = useState(false);
    const docContentRef = useRef<HTMLTextAreaElement>(null);
    const [activeTab, setActiveTab] = useState("request")
    const [doc, setDoc] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [showDocs, setShowDocs] = useState(true)

    const searchParams = useSearchParams();
    const [pageLoading, setPageLoading] = useState(false)

    const handleTabClick = (value: string) => {
        setActiveTab(value)
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (workspaceNameInputRef.current && !workspaceNameInputRef.current.contains(event.target as Node)) {
                // handleWorkspaceNameEdit(workspaceNameInputRef.current.value)
            }

            else if (docContentRef.current && !docContentRef.current.contains(event.target as Node)) {
                // handleDocContentChange(docContentRef.current.value)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    useEffect(() => {
        if (activeEndpoint) {
            const manager = new RequestManager(activeEndpoint);
            setRequestManager(manager);
            setHasUnsavedChanges(false);
        }
    }, [activeEndpoint]);

    // Check for unsaved changes when changing tabs or leaving the page
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (hasUnsavedChanges) {
                e.preventDefault();
                e.returnValue = '';
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [hasUnsavedChanges]);

    const handleMethodChange = (method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE') => {
        if (requestManager && activeEndpoint) {
            requestManager.updateState({ method });
            setActiveEndpoint({...activeEndpoint, method });
            setHasUnsavedChanges(requestManager.hasChanges());
        }
    };

    const handleProtocolChange = (protocol: string) => {
        if (requestManager && activeEndpoint?.baseUrl) {
            const updatedBaseUrl = { ...activeEndpoint.baseUrl, protocol };
            requestManager.updateState({ protocol });
            setActiveEndpoint({...activeEndpoint, baseUrl: updatedBaseUrl });
            setHasUnsavedChanges(requestManager.hasChanges());
        }
    };

    const handleBaseUrlChange = (baseUrl: BaseUrl) => {
        if (requestManager && activeEndpoint) {
            requestManager.updateState({ baseUrl });
            setActiveEndpoint({...activeEndpoint, baseUrl, baseUrlId: baseUrl.id ?? -1 });
            setHasUnsavedChanges(requestManager.hasChanges());
        }
    };

    const handleUrlChange = (url: string) => {
        if (requestManager && activeEndpoint) {
            requestManager.updateState({ url });
            setActiveEndpoint({...activeEndpoint, url });
            setHasUnsavedChanges(requestManager.hasChanges());
        }
    };

    const handleHeadersChange = (headers: string) => {
        if (requestManager && activeEndpoint) {
            requestManager.updateState({ headers });
            setActiveEndpoint({...activeEndpoint, headers });
            setHasUnsavedChanges(requestManager.hasChanges());
        }
    };

    const handleBodyChange = (body: string) => {
        if (requestManager && activeEndpoint) {
            requestManager.updateState({ body });
            setActiveEndpoint({...activeEndpoint, body });
            setHasUnsavedChanges(requestManager.hasChanges());
        }
    };

    const handleSaveChanges = async () => {
        if (!requestManager || !activeEndpoint) return;

        setIsLoading(true);
        try {
            // TODO: Implement the actual save to backend
            // const updatedEndpoint = await updateEndpoint(activeEndpoint);
            requestManager.commitChanges();
            setHasUnsavedChanges(false);
            toast.success('Changes saved successfully');
        } catch (error) {
            handleError(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDiscardChanges = () => {
        if (!requestManager || !activeEndpoint) return;

        requestManager.resetToOriginal();
        const originalState = requestManager.getOriginalState();
        setActiveEndpoint({
            ...activeEndpoint,
            method: originalState.method,
            baseUrl: originalState.baseUrl,
            url: originalState.url,
            headers: originalState.headers,
            body: originalState.body
        });
        setHasUnsavedChanges(false);
        setIsUnsavedChangesDialogOpen(false);
    };

    const sendRequest = async () => {
        if (!requestManager) return;

        setIsLoading(true);
        try {
            const result = await requestManager.sendRequest();
            if (result.response) {
                toast.success(`[${result.response.status}: ${result.response.statusText}]`, 'Request successful');
                setResponseData(prettifyJson(JSON.stringify(result.response)) ?? '{}');
            } else if (result.error) {
                handleError(result.error);
                setResponseData(prettifyJson(JSON.stringify(result.error)) ?? '{}');
            }
        } finally {
            setIsLoading(false);
        }
    };

    function getResponse() {
        if (!responseData) return
        
        var obj = JSON.parse(responseData ?? '{}')
        if (obj.data?.headers) {
            obj.data.headers = JSON.parse((obj.data.headers + ""))
        }

        if (obj.data?.body) {
            obj.data.body = JSON.parse((obj.data.body + ""))
        }

        if (obj.data?.config?.data && typeof obj.data.config.data === 'string') {
            try {
                obj.data.config.data = JSON.parse(obj.data.config.data)
            } catch (e) {
                console.log('Failed to parse config data:', e)
            }
        }
        return JSON.stringify(obj, null, 2)
    }

    return <DashboardLayout>
        <ErrorBoundary>
            <div className="flex-1 overflow-hidden flex flex-col">
                <LoadingWrapper isLoading={pageLoading}>
                    <main className="flex-1 p-6 overflow-auto">
                        {/* <EndpointDetails end={props.activeEndpoint} /> */}

                        <Tabs defaultValue="request" className="w-full h-full">
                            <div className="flex justify-between items-center mb-4">
                                <TabsList className="bg-gray-700">
                                    <TabsTrigger
                                        value="request"
                                        className="data-[state=active]:bg-red-500 data-[state=active]:text-white hover:bg-red-800 hover:text-white"
                                        onClick={() => handleTabClick("request")} // Handle tab click
                                    >
                                        Request
                                    </TabsTrigger>
                                    <TabsTrigger
                                        value="docs"
                                        className="data-[state=active]:bg-red-500 data-[state=active]:text-white hover:bg-red-800 hover:text-white"
                                        onClick={() => handleTabClick("docs")} // Handle tab click
                                    >
                                        Documentation
                                    </TabsTrigger>
                                    {/* <TabsTrigger
                                        value="environment"
                                        className="data-[state=active]:bg-red-500 data-[state=active]:text-white hover:bg-red-800 hover:text-white"
                                        onClick={() => handleTabClick("environment")} // Handle tab click
                                    >
                                        Environment
                                    </TabsTrigger> */}

                                    {/* <TabsTrigger
                                        value="tests"
                                        className="data-[state=active]:bg-red-500 data-[state=active]:text-white hover:bg-red-800 hover:text-white"
                                        onClick={() => handleTabClick("tests")} // Handle tab click
                                    >
                                        Tests
                                    </TabsTrigger> */}
                                </TabsList>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleSaveChanges}
                                    disabled={!hasUnsavedChanges || isLoading}
                                >
                                    <Save className="h-4 w-4" />
                                </Button>
                            </div>

                            <TabsContent className="flex flex-col" value="request">
                                <div className="flex space-x-2">
                                    <select
                                        className="bg-gray-700 border border-gray-600 rounded px-2 py-1"
                                        value={activeEndpoint?.method}
                                        onChange={(e) => handleMethodChange(e.target.value as 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE')}
                                    >
                                        <option value="GET">GET</option>
                                        <option value="POST">POST</option>
                                        <option value="PUT">PUT</option>
                                        <option value="PATCH">PATCH</option>
                                        <option value="DELETE">DELETE</option>
                                    </select>
                                    <select
                                        className="bg-gray-700 border border-gray-600 rounded px-2 py-1"
                                        value={activeEndpoint?.baseUrl?.protocol}
                                        onChange={(e) => handleProtocolChange(e.target.value)}
                                    >
                                        <option value="HTTP">HTTP</option>
                                        <option value="HTTPS">HTTPS</option>
                                    </select>
                                    <select
                                        className="bg-gray-700 border border-gray-600 rounded px-2 py-1"
                                        value={activeEndpoint?.baseUrl?.value}
                                        onChange={(e) => {
                                            if (e.target.value === 'Manage...') {
                                                setIsDialogOpen(true);
                                                return;
                                            }
                                            const selectedBaseUrl = baseUrls.find(x => x.value === e.target.value);
                                            if (selectedBaseUrl) {
                                                handleBaseUrlChange(selectedBaseUrl);
                                            }
                                        }}
                                    >
                                        {baseUrls?.map((x, index) => (
                                            <option key={index} value={x.value}>
                                                {x.value}
                                            </option>
                                        ))}
                                        <option>Manage...</option>
                                    </select>

                                    <ManageBaseUrlsDialog
                                        baseUrls={baseUrls}
                                        setIsDialogOpen={setIsDialogOpen}
                                        isDialogOpen={isDialogOpen}
                                        activeEndpoint={activeEndpoint}
                                        addBaseUrl={addBaseUrl} />
                                    <Input
                                        type="text"
                                        placeholder="Enter request URL"
                                        value={activeEndpoint?.url ?? ''}
                                        onChange={(e) => handleUrlChange(e.target.value)}
                                        className="flex-1 bg-gray-700 border-gray-600 text-gray-100"
                                    />

                                    {/* Send Request */}
                                    <Button
                                        onClick={sendRequest}
                                        className={`bg-red-500 hover:bg-cyan-600 text-white ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                        disabled={isLoading}
                                    >
                                        <Send className="mr-2 h-4 w-4" />
                                        {isLoading ? 'Sending...' : 'Send'}
                                    </Button>
                                </div>
                                <div className="space-y-4 grid grid-cols-3">

                                    <div className={"space-y-4 w-full mt-2 p-2 " + (showDocs ? "col-span-2" : "col-span-3")}>
                                        <div className="space-y-4">
                                            {/* <CustomGPTAgent className={""} /> */}
                                            <Tabs defaultValue="headers" className="w-full">
                                                <TabsList className="bg-gray-700">
                                                    <TabsTrigger value="headers" className="data-[state=active]:bg-red-500 data-[state=active]:text-white hover:bg-red-800 hover:text-white">Headers</TabsTrigger>
                                                    <TabsTrigger value="body" className="data-[state=active]:bg-red-500 data-[state=active]:text-white hover:bg-red-800 hover:text-white">Body</TabsTrigger>
                                                </TabsList>
                                                <Button
                                                    variant="outline"
                                                    className="bg-transparent p-2 absolute right-8"
                                                    onClick={() => {
                                                        setShowDocs(!showDocs)
                                                    }}
                                                > {showDocs ? <><EyeOff /> Hide Documentation</> : <><Eye /> Show Documentation</>}</Button>
                                                <TabsContent value="headers">
                                                    <div className="border rounded shadow-md">
                                                        <MonacoEditor
                                                            height="500px"
                                                            defaultLanguage="json"
                                                            defaultValue="{}"
                                                            theme="vs-dark"
                                                            value={prettifyJson(activeEndpoint?.headers ?? '{}')!}
                                                            onChange={(value) => handleHeadersChange(value ?? '{}')}
                                                        />
                                                    </div>
                                                </TabsContent>
                                                <TabsContent value="body">
                                                    <div className="border rounded shadow-md">
                                                        <MonacoEditor
                                                            height="500px"
                                                            defaultLanguage="json"
                                                            defaultValue="{}"
                                                            theme="vs-dark"
                                                            value={prettifyJson(activeEndpoint?.body ?? '{}')!}
                                                            onChange={(value) => handleBodyChange(value ?? '{}')}
                                                        />
                                                    </div>
                                                </TabsContent>
                                            </Tabs>
                                        </div>
                                        <div>
                                            <div className="flex flex-row justify-between">
                                                <h3 className="font-semibold mb-2">Response</h3>
                                                <Button disabled={responseData === ''} variant='outline' className="bg-transparent"><Save /> Save Response</Button>
                                            </div>
                                            <div className="border rounded shadow-md">
                                                <SyntaxHighlighter language="json" style={dracula}>
                                                    {responseData}
                                                    {/* {getResponse()} */}
                                                </SyntaxHighlighter>
                                            </div>
                                        </div>
                                    </div>
                                    {showDocs &&
                                        <WysiwygEditor 
                                            endpoint={activeEndpoint ?? fallbackEndpoint} />
                                    }

                                </div>

                            </TabsContent>

                            <TabsContent value="docs">
                                <div className="space-y-4">
                                    <MarkdownEditor
                                        activeDocument={activeEndpoint?.documentation ?? fallbackEndpoint.documentation}
                                        activeEndpoint={activeEndpoint ?? fallbackEndpoint}
                                        // docTitle={endpoints?.find(x => x.id === parseInt(searchParams?.get('endpointId') ?? '-1'))?.documentation?.title ?? 'Untitled'}
                                        setDocumentChanged={(changed: boolean) => {
                                            setIsUnsavedChangesDialogOpen(changed)
                                        }}
                                        setActiveEndpoint={setActiveEndpoint}
                                        setEditingTitle={() => { }} // TODO:
                                        markdown={doc}
                                        setMarkdown={setDoc}
                                        isMobile={useIsMobile()}
                                    />
                                </div>
                            </TabsContent>

                            <TabsContent value="tests">
                                <TestsForEndpoint endpoint={activeEndpoint ?? fallbackEndpoint} />
                            </TabsContent>

                            <TabsContent value="environment">
                                <EnvironmentVariables workspaceId={activeWorkspace?.id ?? -1} />
                            </TabsContent>
                        </Tabs>
                    </main>
                </LoadingWrapper>
            </div>

            {/* Unsaved Changes Dialog */}
            <AlertDialog open={isUnsavedChangesDialogOpen} onOpenChange={setIsUnsavedChangesDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
                        <AlertDialogDescription>
                            You have unsaved changes. Would you like to save before exiting?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleDiscardChanges}>Discard</AlertDialogCancel>
                        <AlertDialogAction onClick={handleSaveChanges}>
                            <Save className="mr-2 h-4 w-4" />
                            Save
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Loading animation */}
            {isLoading && <LoadingSpinner overlay size="lg" />}
        </ErrorBoundary>
    </DashboardLayout>
}

export default ApiClientPage;