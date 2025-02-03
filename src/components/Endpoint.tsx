import { withEllipses } from "@/lib/utils";
import { Endpoint } from "@/model";
import { useSearchParams } from "next/navigation";
import { EndpointDropdown } from "./icons/IconDropdown";

type EndpointEntryProps = {
    endpoint: Endpoint,
    setActiveEndpoint: (endpoint: Endpoint) => void,
    setLoading: (loading: boolean) => void,
    deleteEndpoint: (id: number) => void,
}

const EndpointEntry = (props: EndpointEntryProps) => {
    const searchParams = new URLSearchParams(useSearchParams());
    return (
        <div key={props.endpoint?.id} className="group flex flex-row justify-between overflow-hidden">
            <div className={"m-1 hover:cursor-pointer hover:underline text-xs "
                + (props.endpoint?.id === parseInt(searchParams?.get('endpointId') ?? '-1')
                    ? 'text-cyan-400' : '')}
                onClick={() => {
                    props.setLoading(true);
                    props.setActiveEndpoint(props.endpoint);
                }}
            >
                <span className={'mr-1 method ' + props.endpoint?.method.toLocaleLowerCase()}>{props.endpoint?.method}</span>
                <span className="max-w-1">
                    {withEllipses((props.endpoint?.name ?? props.endpoint?.url), 25)}
                </span>
            </div>
            <EndpointDropdown deleteEndpoint={() => { props.deleteEndpoint(props.endpoint?.id) }} />
        </div>
    )
}

export default EndpointEntry