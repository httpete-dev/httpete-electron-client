'use client'

import { ChevronLeft, ChevronRight, User, CreditCard, Settings2, BrainCog } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TooltipProvider, Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import "@/styles/settings-sidebar.scss";
type SettingsSidebarProps = {
  width: number;
  activePage: string;
};

const options = [
  {
    name: 'profile',
    label: 'Profile',
    icon: <User/>,
    href: '/settings/profile'
  }, 
  {
    name: 'system',
    label: 'System Settings',
    icon: <Settings2/>,
    href: '/settings/system'
  },
  {
    name: 'billing',
    label: 'Billing',
    icon: <CreditCard />,
    href: '/settings/billing'
  },
  {
    name: 'pete',
    label: 'Pete',
    icon: <BrainCog />,
    href: '/settings/pete'
  }
];

const SettingsSidebar = (props: SettingsSidebarProps) => {
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const mobileBreakpoint = 768;
    setIsMobile(props.width < mobileBreakpoint);
  }, [props.width]);

  return (
    <TooltipProvider>
      <aside className={`
        sidebar
        transition-all duration-300 ease-in-out
        ${isLeftSidebarCollapsed ? 'w-20' : 'w-64'}
      `}>
          <div className="flex flex-col">
          <div className="p-4">
            {!isLeftSidebarCollapsed && (
              <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
            )}
            <nav className="space-y-2">
              {options.map(option => (
                <Tooltip key={option.name}>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost"
                      asChild
                      className={`
                        w-full flex items-center gap-3 px-3 py-2 transition-colors
                        ${props.activePage === option.name 
                          ? 'bg-white text-black hover:bg-gray-100' 
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'}
                      `}
                    >
                      <Link href={option.href}>
                        {option.icon}
                        {!isLeftSidebarCollapsed && <span>{option.label}</span>}
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  {isLeftSidebarCollapsed && (
                    <TooltipContent side="right">
                      {option.label}
                    </TooltipContent>
                  )}
                </Tooltip>
              ))}
            </nav>
          </div>

          <Button
            variant="ghost"
            className="mt-auto mx-auto mb-4 p-2 text-gray-400 hover:text-white"
            onClick={() => setIsLeftSidebarCollapsed(!isLeftSidebarCollapsed)}
          >
            {isLeftSidebarCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  );
};

export default SettingsSidebar;