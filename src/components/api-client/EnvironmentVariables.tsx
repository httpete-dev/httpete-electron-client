type EnvironmentVariablesProps = {
    workspaceId: number
}

const EnvironmentVariables = (props: EnvironmentVariablesProps) => {
    return (
        <div>
            Environment Variables for workspace: {props.workspaceId}
        </div>
    )
}

export default EnvironmentVariables;