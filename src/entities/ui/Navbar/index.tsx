import { Button, Dropdown, Flex, Layout, MenuProps, Typography } from 'antd'
import { RolesEnum } from '../../../shared/types/user/RolesEnum.ts'
import { NavLink } from 'react-router-dom'
import { RouteType } from '../../../app/routes/RouteType.ts'
import { ProfileResponse } from '../../../shared/api/Auth/AuthDataSource.ts'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { MenuOutlined } from '@ant-design/icons'

const { Title } = Typography

interface NavbarProps {
  profile: ProfileResponse | undefined
}

const studentMenu: MenuProps['items'] = [
  {
    key: '1',
    label: <NavLink to={RouteType.STUDENT_INTERNSHIP_PROGRESS}>{'Собеседования'}</NavLink>,
  },
  {
    key: '2',
    label: <NavLink to={RouteType.STUDENT_INTERNSHIP}>{'Стажировки'}</NavLink>,
  },
]

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
          Система стажировок
        </Title>
        {breakPoint.lg ? (
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
        ) : (
          <Dropdown menu={{ items: studentMenu }}>
            <Button type={'primary'}>
              <MenuOutlined />
            </Button>
          </Dropdown>
        )}
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
