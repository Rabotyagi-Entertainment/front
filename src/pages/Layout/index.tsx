import { Outlet } from 'react-router-dom'
import { Navbar } from '../../entities/ui/Navbar'
import { useGetProfileQuery } from '../../shared/api/Auth/AuthRequest.ts'
import { Spin } from 'antd'

const MainLayout = () => {
  const { data, isLoading } = useGetProfileQuery({})

  return (
    <div>
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
