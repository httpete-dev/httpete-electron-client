import { ChevronDown, ChevronRight, ChevronUp, Expand, Eye, PenLine, ToggleLeft } from "lucide-react";
import { useState } from "react";
import { prettifyJson } from "@/lib/utils";
import { Endpoint, EndpointTest } from "@/model";

type TestsForEndpointProps = {
    endpoint: Endpoint
}

const TestsForEndpoint = (props: TestsForEndpointProps) => {
    const tests = [
        {
            name: 'CreateUsers_ThrowsException_WhenUserAlreadyExists',
            file: 'MyProject.Tests/Core/CreateUsers_ThrowsException_WhenUserAlreadyExist.cs',
            authorName: 'John Doe',
            authoredDate: new Date(),
            lastModifyByName: 'Jane Doe',
            lastModifyDate: new Date()
        },
        {
            name: 'CreateUsers_ReturnsCreatedUser_WhenOperationIsSuccessful',
            file: 'MyProject.Tests/Core/CreateUsers_ReturnsCreatedUser_WhenOperationIsSuccessful.cs',
            authorName: 'Jane Doe',
            authoredDate: new Date(),
            lastModifyByName: 'Jane Doe',
            lastModifyDate: new Date()
        }
    ] as EndpointTest[];

    return (
        <div>
            <h1>
                Hello
            </h1>
            <div>
                <EndpointTestComponent tests={props.endpoint.tests ?? tests} />
            </div>
        </div>
    )
}

export default TestsForEndpoint;


export const EndpointTestComponent = ({ tests }: { tests: EndpointTest[] }) => {
    // State to manage collapse status for each test
    const [collapsedStates, setCollapsedStates] = useState(() =>
        Object.fromEntries(tests.map(test => [test.name, true]))
    );
    const toggleCollapse = (testName: string) => {
        setCollapsedStates(prev => ({
            ...prev,
            [testName]: !prev[testName], // Toggle the state for the specific test
        }));
    };

    return (
        <div className="p-2">
            {tests.map(test => (
                <div key={test.name} onClick={() => toggleCollapse(test.name)}
                className="m-2 mb-4">
                    <div className="flex flex-row h-fit items-center max-w-3xl bg-gray-700 rounded-lg">
                        <div className="m-2">
                            {collapsedStates[test.name] ? <ChevronRight /> : <ChevronDown />}
                        </div>
                        <h6 className="m-0">{test.name}</h6>
                    </div>
                    {!collapsedStates[test.name] && (
                        <div className="pl-8 pr-4 py-4 max-w-3xl overflow-y-hidden overflow-x-auto bg-gray-800 rounded-lg">
                            <p>Author: {test.authorName}</p>
                            <p>Authored Date: {test.authoredDate.toLocaleString()}</p>
                            <p>Last Modified By: {test.lastModifyByName}</p>
                            <p>Last Modified Date: {test.lastModifyDate.toLocaleString()}</p>
                            <p>File: {test.file}</p>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};