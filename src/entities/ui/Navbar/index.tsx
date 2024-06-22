import { Flex, Layout, Typography } from 'antd'
import { RolesEnum } from '../../../shared/types/user/RolesEnum.ts'
import { NavLink } from 'react-router-dom'
import { RouteType } from '../../../app/routes/RouteType.ts'
import { ProfileResponse } from '../../../shared/api/Auth/AuthDataSource.ts'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'

const { Title } = Typography

interface NavbarProps {
  profile: ProfileResponse | undefined
}

export const Navbar = ({ profile }: NavbarProps) => {
  const breakPoint = useBreakpoint()

  return (
    <Layout>
      <Flex
        style={{ padding: '1rem' }}
        gap={'1rem'}
        align={'center'}
        justify={'space-between'}
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
        {breakPoint.lg && (
          <Title
            style={{ lineHeight: 'normal', marginTop: 0, marginBottom: 0 }}
            level={5}
          >
            {profile!.fullName}
          </Title>
        )}
      </Flex>
    </Layout>
  )
}
