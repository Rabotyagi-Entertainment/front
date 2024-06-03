import { Route, Routes } from 'react-router-dom'
import { lazy } from 'react'

const Internship = lazy(() => import('../../pages/User/Internship'))
const Diary = lazy(() => import('../../pages/User/Diary'))
const Auth = lazy(() => import('../../pages/User/Auth'))
const AdminAuth = lazy(() => import('../../pages/Admin/Auth'))
const Students = lazy(() => import('../../pages/Admin/Lists'))

export const Router = () => {
  return (
    <Routes>
      <Route
        index
        element={<Internship />}
      />
      <Route
        path='/diary'
        element={<Diary />}
      />
      <Route
        path='/login'
        element={<Auth />}
      />
      <Route
        path='/admin/login'
        element={<AdminAuth />}
      />
      <Route
        path='/students'
        element={<Students />}
      />
    </Routes>
  )
}
