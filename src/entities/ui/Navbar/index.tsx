import { Flex, Layout, Typography } from 'antd'
import { RolesEnum } from '../../../shared/types/user/RolesEnum.ts'
import { NavLink } from 'react-router-dom'
import { RouteType } from '../../../app/routes/RouteType.ts'
import { ProfileResponse } from '../../../shared/api/Auth/AuthDataSource.ts'

const { Title } = Typography

interface NavbarProps {
  profile: ProfileResponse | undefined
}

export const Navbar = ({ profile }: NavbarProps) => {
  return (
    <Layout>
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
        <Flex gap={'1rem'}>
          {profile! && profile.roles.includes(RolesEnum.ADMIN) ? (
            <NavLink to={RouteType.ADMIN_LISTS}>{'Списки'}</NavLink>
          ) : (
            <>
              <NavLink to={RouteType.STUDENT_INTERNSHIP_PROGRESS}>{'Собеседования'}</NavLink>
              <NavLink to={RouteType.STUDENT_INTERNSHIP}>{'Стажировки'}</NavLink>
            </>
          )}
        </Flex>
        <Title
          style={{ lineHeight: 'normal', marginTop: 0, marginBottom: 0 }}
          level={5}
        >
          {profile!.fullName}
        </Title>
      </span>
    </Layout>
  )
}
