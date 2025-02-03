import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import UserStatistics from "./UserStatistics";

const ProfileSection = () => {
    return (
        <div className="border-2 rounded-lg border-gray-800 w-fit p-8">
            <Avatar className="bg-slate-300 text-slate-800 mx-auto mt-24 mb-24" style={{scale:'5'}}>
                <AvatarImage width={500} height={500} src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback className="bg-red-200" color="black" style={{color:'black'}}>CN</AvatarFallback>
            </Avatar>
            <h2 className="text-center mt-4">John Doe</h2>
            <p className="text-center mt-1">john.doe@example.com</p>
            {/* <UserStatistics /> */}
        </div>
    )
}

export default ProfileSection;