import { Navigate, useRoutes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ProtectedAdminRoutes, ProtectedRoutes } from './ProtectedRoutes'
import { RouteType } from './RouteType.ts'
import { Spin } from 'antd'
import { RolesEnum } from '../../shared/types/user/RolesEnum.ts'

const Auth = lazy(() => import('../../pages/User/Auth'))
const Login = lazy(() => import('../../pages/User/Login'))
const MainLayout = lazy(() => import('../../pages/Layout'))

const createRoutes = (isAuth: boolean) => {
  return [
    {
      element: isAuth ? <MainLayout /> : <Navigate to={RouteType.LOGIN} />,
      children: ProtectedRoutes,
    },
    {
      path: RouteType.LOGIN,
      element: <Login />,
    },
    {
      path: RouteType.REGISTER,
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
      element: isAuth ? <MainLayout /> : <Navigate to={RouteType.LOGIN} />,
      children: ProtectedAdminRoutes,
    },
    {
      path: RouteType.LOGIN,
      element: <Login />,
    },
    {
      path: '*',
      element: <Navigate to={RouteType.ADMIN_LISTS} />,
    },
  ]
}

interface RouterProps {
  role: RolesEnum
}

export const Router = ({ role }: RouterProps) => {
  const isAuth = localStorage.getItem('userToken')
  const customRouter = useRoutes(
    role && role.includes(RolesEnum.ADMIN) ? createAdminRoutes(!!isAuth) : createRoutes(!!isAuth)
  )
  return <Suspense fallback={<Spin />}>{customRouter}</Suspense>
}
