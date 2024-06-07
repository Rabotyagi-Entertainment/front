import { Outlet } from 'react-router-dom'
import { Navbar } from '../../entities/ui/Navbar'

const MainLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default MainLayout
