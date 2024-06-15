import { ReactNode } from 'react'
import DiaryStudent from '../../../pages/User/Diary'
import Lists from '../../../pages/Admin/Lists'
import InternshipAdmin from '../../../pages/Admin/Internship'
import DiaryAdmin from '../../../pages/Admin/Diary'
import { InternshipProgress } from '../../../pages/User/InternshipProgresses'
import { InternshipStudent } from '../../../pages/User/Internship'

export interface IRoute {
  path: string
  element?: ReactNode
  icon?: ReactNode
  title?: string
  children?: IRoute[]
}

export const ProtectedRoutes: Array<IRoute> = [
  {
    path: '/student',
    title: 'Студент',
    children: [
      {
        path: 'internship/progress',
        title: 'Собеседования',
        element: <InternshipStudent />,
      },
      {
        path: 'diary/:id',
        title: 'Дневники',
        element: <DiaryStudent />,
      },
      {
        path: 'internship',
        title: 'Стажировки',
        element: <InternshipProgress />,
      },
    ],
  },
  {
    path: 'admin/lists',
    title: 'Списки',
    element: <Lists />,
    children: [
      {
        path: 'internship/:id',
        title: 'Студент',
        element: <InternshipAdmin />,
      },
      {
        path: 'diary/:id',
        title: 'Студент',
        element: <DiaryAdmin />,
      },
    ],
  },
]
