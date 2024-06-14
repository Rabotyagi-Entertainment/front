import { Typography } from 'antd'
import { NavLink } from 'react-router-dom'
import { useGetProfileQuery } from '../../../shared/api/Auth/AuthRequest.ts'
import { RolesEnum } from '../../../shared/types/user/RolesEnum.ts'

const { Title } = Typography

export const Navbar = () => {
  const { data } = useGetProfileQuery({})

  return (
    <div style={{ width: '100%' }}>
      <span
        style={{
          padding: '1rem',
          display: 'flex',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Title
          style={{ lineHeight: 'normal', marginTop: 0, marginBottom: 0 }}
          level={4}
        >
          Добро пожаловать в систему стажировок
        </Title>
        <span style={{ display: 'flex', gap: '1rem' }}>
          {data! && data.roles === RolesEnum.ADMIN && <NavLink to={'admin/diary'}>{'Дневники'}</NavLink>}
          {data! && data.roles.includes(RolesEnum.ADMIN) ? (
            <NavLink to={'admin/internship'}>{'Стажировки'}</NavLink>
          ) : (
            <>
              <NavLink to={'student/internship'}>{'Собеседования'}</NavLink>
              <NavLink to={'student/internship/progress'}>{'Стажировки'}</NavLink>
            </>
          )}
          {data! && <>{data.roles.includes(RolesEnum.ADMIN) && <NavLink to={'/students'}>{'Дневники'}</NavLink>}</>}
        </span>
      </span>
    </div>
  )
}
