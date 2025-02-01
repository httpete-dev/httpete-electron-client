import { ChartBarIcon } from "lucide-react";

const UserStatistics = () => {
    return (
        <div className="mt-8 p-4 w-fit mx-auto">
            <h3 className="w-fit text-xl font-bold mb-4 flex mx-auto">
                <ChartBarIcon className="w-6 h-6 text-red-500 mr-2" />
                Statistics
            </h3>
            <div className="flex mx-auto flex-col py-0"
                style={{ maxWidth: '300px' }}
            >
                <div className="flex">
                    <span className="mr-2 p-2">Community Karma </span>
                    <span className="ml-auto p-2">20</span>
                </div>
                <div className="flex w-full">
                    <span className="mr-2 p-2">Original Posts </span>
                    <span className="ml-auto p-2">20</span>
                </div>
                <div className="flex w-full">
                    <span className="mr-2 p-2">Comments</span>
                    <span className="ml-auto p-2">20</span>
                </div>

            </div>
        </div>
    )
}

export default UserStatistics;