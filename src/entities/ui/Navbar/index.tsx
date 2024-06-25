import { Button, Dropdown, Flex, Layout, MenuProps, Typography } from 'antd'
import { RolesEnum } from '../../../shared'
import { NavLink } from 'react-router-dom'
import { RouteType } from '../../../app/routes/RouteType.ts'
import { ProfileResponse } from '../../../shared/api/Auth/AuthDataSource.ts'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { MenuOutlined } from '@ant-design/icons'
import { BrbModal } from '../../../Features'

const { Title } = Typography

interface NavbarProps {
  profile: ProfileResponse | undefined
}

const studentMenu = (name: string): MenuProps['items'] => [
  {
    key: '1',
    label: <NavLink to={RouteType.STUDENT_INTERNSHIP_PROGRESS}>{'Собеседования'}</NavLink>,
  },
  {
    key: '2',
    label: <NavLink to={RouteType.STUDENT_INTERNSHIP}>{'Стажировки'}</NavLink>,
  },
  {
    key: '3',
    label: <NavLink to={'#'}>{name}</NavLink>,
  },
]

const adminMenu = (name: string): MenuProps['items'] => [
  {
    key: '1',
    label: <NavLink to={RouteType.ADMIN_LISTS}>{'Списки'}</NavLink>,
  },
  {
    key: '2',
    label: <BrbModal />,
  },
  {
    key: '3',
    label: <NavLink to={'#'}>{name}</NavLink>,
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
          <Flex
            gap={'1rem'}
            align={'center'}
          >
            {profile! && profile.roles.includes(RolesEnum.ADMIN) ? (
              <>
                <NavLink to={RouteType.ADMIN_LISTS}>{'Списки'}</NavLink>
                <BrbModal />
              </>
            ) : (
              <>
                <NavLink to={RouteType.STUDENT_INTERNSHIP_PROGRESS}>{'Собеседования'}</NavLink>
                <NavLink to={RouteType.STUDENT_INTERNSHIP}>{'Стажировки'}</NavLink>
              </>
            )}
          </Flex>
        ) : (
          <Dropdown
            menu={{
              items:
                profile! && profile.roles.includes(RolesEnum.ADMIN)
                  ? adminMenu(profile?.fullName!)
                  : studentMenu(profile?.fullName!),
            }}
          >
            <Button type={'primary'}>
              <MenuOutlined />
            </Button>
          </Dropdown>
        )}
        {breakPoint.lg && profile && (
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
