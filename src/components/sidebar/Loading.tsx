const Loading = (props: {text:string, className?: string | undefined, size?: number | undefined}) => {
    return <div className={'flex flex-row rounded-lg '}
        style={{
            scale: props.size ?? 1,
        }}>
        <div
            className={"text-white border-2 border-t-transparent rounded-full mt-0 p-1 animate-spin w-4 h-4"
             }
        >
        </div>
        <span className='pt-1 pl-2 text-sm sca'>{props.text}</span>
    </div>
}

export default Loading;