import { Typography } from 'antd'
import { NavLink } from 'react-router-dom'
import { useGetProfileQuery } from '../../../shared/api/Auth/AuthRequest.ts'
import { RolesEnum } from '../../../shared/types/user/RolesEnum.ts'

const { Title } = Typography

export const Navbar = () => {
  const { data } = useGetProfileQuery({})
  return (
    <div>
      <Title>Добро пожаловать в систему стажировок</Title>
      <span>
        <NavLink to={'/diary'}>{'Дневники'}</NavLink>
        <NavLink to={'/internship'}>{data!.roles.includes(RolesEnum.ADMIN) ? 'Стажировки' : 'Стажировка'}</NavLink>
        {data!.roles.includes(RolesEnum.ADMIN) && <NavLink to={'/students'}>{'Дневники'}</NavLink>}
      </span>
      <NavLink to={'/profile'}>{data!.fullName}</NavLink>
    </div>
  )
}
