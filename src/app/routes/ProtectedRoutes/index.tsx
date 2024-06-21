import { ReactNode } from 'react'
import DiaryStudent from '../../../pages/User/Diary'
import Lists from '../../../pages/Admin/Lists'
import InternshipAdmin from '../../../pages/Admin/Internship'
import DiaryAdmin from '../../../pages/Admin/Diary'
import { InternshipProgressStudent } from '../../../pages/User/InternshipProgresses'
import { InternshipStudent } from '../../../pages/User/Internship'
import { InternshipProgressAdmin } from '../../../pages/Admin/internshipProgress'
import { RouteType } from '../RouteType.ts'

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
        element: <InternshipProgressStudent />,
      },
      {
        path: 'diary/:id',
        title: 'Дневники',
        element: <DiaryStudent />,
      },
      {
        path: 'internship',
        title: 'Стажировки',
        element: <InternshipStudent />,
      },
    ],
  },
  {
    path: `${RouteType.ADMIN_INTERNSHIP}/:id`,
    title: 'Администрирование стажировки',
    element: <InternshipAdmin />,
  },
  {
    path: `${RouteType.ADMIN_INTERNSHIP_PROGRESS}/:id`,
    title: 'Администрирование собеседований',
    element: <InternshipProgressAdmin />,
  },
  {
    path: `${RouteType.ADMIN_DIARY}/:id`,
    title: 'Студенческие дневники',
    element: <DiaryAdmin />,
  },
  {
    path: RouteType.ADMIN_LISTS,
    title: 'Списки',
    element: <Lists />,
  },
]
