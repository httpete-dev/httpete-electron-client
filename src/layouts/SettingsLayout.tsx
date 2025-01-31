import Navbar from "@/components/layout/navbar";

 
export default function SettingsLayout({ children }) {
  return (
    <>
      <Navbar title={"Settings"} isMobile={false} />
      <main>{children}</main>
    </>
  )
}