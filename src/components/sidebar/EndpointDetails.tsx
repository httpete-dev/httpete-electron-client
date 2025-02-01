import { Endpoint } from "@/model";

type EndpointDetailsProps = {
    end : Endpoint
}

const EndpointDetails = (props: EndpointDetailsProps) => {
    return (
        <div className="flex flex-row justify-between">
            <span>Endpoint Name: {props.end.name}</span>
            <span>Descritpion: {props.end.documentation?.title}</span>
            <span>Last Worked On by: John Doe</span>
            <span>Last Updated: 2023-01-01</span>
        </div>
    )
}

export default EndpointDetails;