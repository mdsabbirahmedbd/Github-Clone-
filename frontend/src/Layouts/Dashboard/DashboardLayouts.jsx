import { Outlet } from "react-router"
import Footer from "../../components/Shared/Footer"
import DashboardNavbar from "../../components/Shared/DashboardNavbar"


const DashboardLayouts = () => {
  return (
     <div  className="min-h-screen max-w-[1600px] mx-auto">
        <DashboardNavbar/>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default DashboardLayouts