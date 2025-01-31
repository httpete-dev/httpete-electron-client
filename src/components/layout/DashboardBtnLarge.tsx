import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Loading from "../animated/Loading";

type DashboardBtnLargeProps = {
    path: string,
    icon: React.ReactNode,
    title: string,
    activePage: string;
    setActivePage: (page: string) => void;
}

export const DashboardBtnLarge = (props: DashboardBtnLargeProps) => {
    const router = useRouter();
    const path = usePathname();
    const isActive = path === props.path;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, [path])

    return <>
        <button disabled={router.pathname === props.path} onMouseDown={() => {
            setLoading(true);
            router.push(props.path)
        }}
            className={("flex text-sm text-white p-2 rounded-full  transition duration-300") + (isActive === true ? ' bg-red-900 hover:bg-red-800' : ' hover:bg-gray-600')}>
            {loading ?
                <Loading text={props.title} className="text-white border-white" />
                : <>
                    <div className="mx-1">
                        {props.icon}
                    </div>
                    <div className="mx-1">
                        {props.title}
                    </div>
                </>}
        </button>
    </>
}