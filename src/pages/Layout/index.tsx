import { Outlet } from 'react-router-dom'
import { Navbar } from '../../entities/ui/Navbar'
import { useGetProfileQuery } from '../../shared/api/Auth/AuthRequest.ts'
import { Spin } from 'antd'

const MainLayout = () => {
  const { data, isLoading } = useGetProfileQuery({})

  return (
    <div style={{ width: '100%', height: '100%' }}>
      {!isLoading ? (
        <>
          <Navbar profile={data} />
          <div style={{ padding: '1rem' }}>
            <Outlet />
          </div>
        </>
      ) : (
        <Spin />
      )}
    </div>
  )
}

export default MainLayout
