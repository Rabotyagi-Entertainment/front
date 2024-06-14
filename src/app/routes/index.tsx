import { Navigate, useRoutes } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { ProtectedRoutes } from './ProtectedRoutes'

const Auth = lazy(() => import('../../pages/User/Auth'))
const AdminAuth = lazy(() => import('../../pages/Admin/Auth'))
const MainLayout = lazy(() => import('../../pages/Layout'))

const createRoutes = (isAuth: boolean) => [
  {
    path: '/',
    element: isAuth ? <MainLayout /> : <Navigate to={'/login'} />,
    children: ProtectedRoutes,
  },
  {
    path: '/login',
    element: <Auth />,
  },
  {
    path: '/admin/login',
    element: <AdminAuth />,
  },
  // {
  //   path: '/*',
  //   element: <Navigate to={'/'} />,
  // },
]

export const Router = () => {
  const isAuth = localStorage.getItem('userToken')
  const customRouter = useRoutes(createRoutes(!!isAuth))
  return <Suspense fallback={<span>{'loading'}</span>}>{customRouter}</Suspense>
}
