'use client'

import { ChevronLeft, ChevronRight, User, CreditCard, Settings2, Share2, GitMerge, Link, ArrowRightLeft, Brain, BrainCircuit, BrainCog } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

type SettingsSidebarProps = {
  width: number;
  activePage: string,
  setActivePage: (page: string) => void;
};
const options = [
  {
    name: 'Profile',
    icon: <User/>,
  }, 
  {
    name: 'System Settings',
    icon: <Settings2/>
  },
  {
    name: 'Billing',
    icon: <CreditCard />
  },
  {
    name: 'Pete',
    icon: <BrainCog />
  }
]

const SettingsSidebar = (props: SettingsSidebarProps) => {
  const checkMobile = () : boolean => {
    // Define mobile breakpoint (e.g., 768px)
    const mobileBreakpoint = 768; // Common breakpoint for mobile devices


    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobileAgent = /android|avantgo|blackberry|bada|bb10|iemobile|opera mini|opera mobi|phone|mobile|mini|wap/i.test(userAgent);

    return props.width < mobileBreakpoint || isMobileAgent;
  }
    
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(checkMobile())

  return (
    <div className="bg-gray-800 border-r-2 border-red-400 p-6 shadow-md transition-all duration-300 ease-in-out w-24 md:w-24 sm:w-24 lg:w-fit">
      {isLeftSidebarCollapsed
        ? <ChevronRight className='hover:text-gray-300 text-gray-500'  style={{ position: 'absolute', bottom:'2rem' }} size={32} onClick={() => setIsLeftSidebarCollapsed(false)} />
        : 
        <div className="flex gap-2 hover:text-gray-300 text-gray-500" style={{ position: 'absolute', bottom:'2rem' }}
        onClick={() => setIsLeftSidebarCollapsed(true)}
        >
        <ChevronLeft size={32} />
          <span className="mt-1 sm:hidden">Collapse</span>
        </div>}
      <div className={`${isLeftSidebarCollapsed ? 'w-8' : 'w-64'}`}>
        {isLeftSidebarCollapsed
          ? <div className="mt-2">
          {options.map(x =>
                <Button 
                  key={x.name}
                variant={'secondary'} 
                  style={{marginLeft:'-0.5rem'}}
                onClick={() => {props.setActivePage(x.name)}}
                  className={
                    "mb-3"
                    +(props.activePage === x.name ? ' bg-white text-black' : ' bg-gray-700 text-white')}>
                  {x.icon}

                </Button>
              )}
          </div>
          : <>
            <section>
              <div style={{ fontSize: '20pt' }}>
                <h1>Settings</h1>
              </div>
            </section>
            <section className="mt-4">
              {options.map(x =>
                <Button variant={'secondary'} 
                onMouseDown={() => {props.setActivePage(x.name)}}
                  className={
                    "flex flex-row w-12 lg:w-full mb-5 "
                    +(props.activePage === x.name ? ' bg-white text-black' : ' bg-transparent border-2 text-white hover:bg-gray-700')}>
                  {x.icon}
                  {!isMobile && <span>{x.name}</span>}
                </Button>
              )}
            </section>


          </>}
      </div>

    </div>
  )
}

export default SettingsSidebar;