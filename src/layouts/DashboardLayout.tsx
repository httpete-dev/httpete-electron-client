import Navbar from "@/components/layout/navbar";

 
export default function DashboardLayout({ children }) {
  return (
    <>
      <Navbar title="Dashboard" isMobile={false} />
      <main>{children}</main>
    </>
  )
}