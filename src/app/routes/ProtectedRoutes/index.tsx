import { lazy, ReactNode } from 'react'

const Internship = lazy(() => import('../../../pages/User/Internship'))
const Diary = lazy(() => import('../../../pages/User/Diary'))
const Profile = lazy(() => import('../../../pages/User/Profile'))
const Students = lazy(() => import('../../../pages/Admin/Lists'))
const Student = lazy(() => import('../../../pages/User/Student'))

export interface IRoute {
  path: string
  element?: ReactNode
  icon?: ReactNode
  title?: string
  children?: IRoute[]
}

export const ProtectedRoutes: Array<IRoute> = [
  {
    path: '/internship',
    title: 'Стажировки',
    element: <Internship />,
  },
  {
    path: '/diary',
    title: 'Дневники',
    element: <Diary />,
  },
  {
    path: '/profile',
    title: 'Профиль',
    element: <Profile />,
  },
  {
    path: '/students',
    title: 'Списки',
    element: <Students />,
    children: [
      {
        path: '/students/:id',
        title: 'Студент',
        element: <Student />,
      },
    ],
  },
]
