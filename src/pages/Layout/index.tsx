import { Outlet } from 'react-router-dom'
import { Navbar } from '../../entities/ui/Navbar'
import { useGetProfileQuery } from '../../shared/api/Auth/AuthRequest.ts'
import { Spin } from 'antd'
import { Suspense } from 'react'

const MainLayout = () => {
  const { data } = useGetProfileQuery({})

  return (
    <Suspense fallback={<Spin />}>
      <Navbar profile={data} />
      <div style={{ padding: '1rem' }}>
        <Outlet />
      </div>
    </Suspense>
  )
}

export default MainLayout
