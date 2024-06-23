import { Navigate, useRoutes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ProtectedAdminRoutes, ProtectedRoutes } from './ProtectedRoutes'
import { RouteType } from './RouteType.ts'
import { Spin } from 'antd'
import { RolesEnum } from '../../shared/types/user/RolesEnum.ts'

const Auth = lazy(() => import('../../pages/User/Auth'))
const AdminAuth = lazy(() => import('../../pages/Admin/Auth'))
const MainLayout = lazy(() => import('../../pages/Layout'))

const createRoutes = (isAuth: boolean) => {
  return [
    {
      element: isAuth ? <MainLayout /> : <Navigate to={RouteType.STUDENT_LOGIN} />,
      children: ProtectedRoutes,
    },
    {
      path: RouteType.STUDENT_LOGIN,
      element: <Auth />,
    },
    {
      path: '*',
      element: <Navigate to={RouteType.STUDENT_INTERNSHIP_PROGRESS} />,
    },
  ]
}

const createAdminRoutes = (isAuth: boolean) => {
  return [
    {
      element: isAuth ? <MainLayout /> : <Navigate to={RouteType.ADMIN_LOGIN} />,
      children: ProtectedAdminRoutes,
    },
    {
      path: RouteType.ADMIN_LOGIN,
      element: <AdminAuth />,
    },
    {
      path: '*',
      element: <Navigate to={RouteType.ADMIN_LISTS} />,
    },
  ]
}

interface RouterProps {
  isAuth: boolean
  role: RolesEnum
}

export const Router = ({ role, isAuth }: RouterProps) => {
  const customRouter = useRoutes(role.includes(RolesEnum.ADMIN) ? createAdminRoutes(isAuth) : createRoutes(isAuth))
  return <Suspense fallback={<Spin />}>{customRouter}</Suspense>
}
