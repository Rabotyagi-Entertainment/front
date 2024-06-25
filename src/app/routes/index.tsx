import { Navigate, useRoutes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ProtectedAdminRoutes, ProtectedRoutes } from './ProtectedRoutes'
import { RouteType } from './RouteType.ts'
import { Spin } from 'antd'
import { RolesEnum } from '../../shared'
import { jwtDecode } from 'jwt-decode'

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

export const Router = () => {
  const isAuth = localStorage.getItem('userToken')
  const role: { 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': RolesEnum } = isAuth
    ? jwtDecode(isAuth)
    : { 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': RolesEnum.USER }

  const customRouter = useRoutes(
    role['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === RolesEnum.ADMIN
      ? createAdminRoutes(!!isAuth)
      : createRoutes(!!isAuth)
  )
  return <Suspense fallback={<Spin />}>{customRouter}</Suspense>
}
