import { Button, Dropdown, Flex, Layout, MenuProps, Popover, Typography } from 'antd'
import { RolesEnum } from '../../../shared'
import { NavLink } from 'react-router-dom'
import { RouteType } from '../../../app/routes/RouteType.ts'
import { ProfileResponse } from '../../../shared/api/Auth/AuthDataSource.ts'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { MenuOutlined, LogoutOutlined } from '@ant-design/icons'
import { BrbModal } from '../../../Features'
import './index.css'

const { Title, Text } = Typography

const logoutFunction = (e: any) => {
  e.preventDefault()
  e.stopPropagation()
  localStorage.removeItem('userToken')
  window.location.reload()
}

interface NavbarProps {
  profile: ProfileResponse | undefined
}

const studentMenu = (name: string): MenuProps['items'] => [
  {
    key: '1',
    label: <NavLink to={RouteType.STUDENT_INTERNSHIP_PROGRESS}>{'СОБЕСЕДОВАНИЯ'}</NavLink>,
  },
  {
    key: '2',
    label: <NavLink to={RouteType.STUDENT_INTERNSHIP}>{'СТАЖИРОВКИ'}</NavLink>,
  },
  {
    key: '3',
    label: (
      <Flex
        gap={'0.5rem'}
        align={'center'}
      >
        <Text style={{ backgroundColor: '#E0E7FF', borderRadius: '0.5rem', padding: '0.5rem' }}>{name}</Text>
        <Button
          danger
          onClick={logoutFunction}
        >
          <LogoutOutlined />
        </Button>
      </Flex>
    ),
  },
]

const adminMenu = (name: string): MenuProps['items'] => [
  {
    key: '1',
    label: <NavLink to={RouteType.ADMIN_LISTS}>{'СПИСКИ'}</NavLink>,
  },
  {
    key: '2',
    label: <BrbModal />,
  },
  {
    key: '3',
    label: (
      <Popover
        trigger={'click'}
        content={
          <Button
            danger
            onClick={logoutFunction}
          >
            {'Выйти'}
          </Button>
        }
      >
        <NavLink to={'#'}>{name}</NavLink>
      </Popover>
    ),
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
          СИСТЕМА СТАЖИРОВОК
        </Title>
        {breakPoint.lg ? (
          <Flex
            gap={'1rem'}
            align={'center'}
          >
            {profile! && profile.roles.includes(RolesEnum.ADMIN) ? (
              <>
                <NavLink to={RouteType.ADMIN_LISTS}>{'СПИСКИ'}</NavLink>
                <BrbModal />
              </>
            ) : (
              <>
                <NavLink to={RouteType.STUDENT_INTERNSHIP_PROGRESS}>{'СОБЕСЕДОВАНИЯ'}</NavLink>
                <NavLink to={RouteType.STUDENT_INTERNSHIP}>{'СТАЖИРОВКИ'}</NavLink>
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
          <Popover
            trigger={'hover'}
            content={
              <Button
                danger
                onClick={logoutFunction}
              >
                {'Выйти'}
              </Button>
            }
          >
            <NavLink to={'#'}>{profile!.fullName}</NavLink>
          </Popover>
        )}
      </Flex>
    </Layout>
  )
}
