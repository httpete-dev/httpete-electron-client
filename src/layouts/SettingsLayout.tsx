'use client'

import Navbar from "@/components/layout/navbar";
import SettingsSidebar from "@/components/settings-sidebar";
import { useState, useEffect } from "react";
 
export default function SettingsLayout({ children }) {
  
  const [activePage, setActivePage] = useState('Profile')


  const [width, setWidth] = useState(1280)

  useEffect(() => {
    setWidth(window.innerWidth)
  }, [])

  return (
    <>
      <Navbar title={"Settings"} isMobile={false} />
      <SettingsSidebar width={width} activePage={activePage} setActivePage={setActivePage} />

      <main>{children}</main>
    </>
  )
}