import { UserWithCompany } from '../../../shared/types/user/UserWithCompany.ts'
import { List, Flex, Typography } from 'antd'
import { NavLink } from 'react-router-dom'
import { ArrowRightOutlined } from '@ant-design/icons'
import { RouteType } from '../../../app/routes/RouteType.ts'

interface StudentItemProps {
  item: UserWithCompany
}

const { Title } = Typography

export const StudentItem = ({ item: { name, group, id } }: StudentItemProps) => {
  return (
    <List.Item style={{ width: '100%' }}>
      <Flex
        style={{ width: '100%' }}
        align={'center'}
        gap={'1rem'}
        justify={'space-between'}
      >
        <Title
          style={{ marginTop: 0 }}
          level={4}
        >{`${name} - ${group}`}</Title>
        <Flex gap={'1rem'}>
          <NavLink to={`${RouteType.ADMIN_INTERNSHIP}/${id}`}>
            <Flex gap={5}>
              <span> {'Стажировки'}</span>
              <ArrowRightOutlined />
            </Flex>
          </NavLink>
          <NavLink to={`${RouteType.ADMIN_INTERNSHIP_PROGRESS}/${id}`}>
            <Flex gap={5}>
              <span> {'Собеседования'}</span>
              <ArrowRightOutlined />
            </Flex>
          </NavLink>
        </Flex>
      </Flex>
    </List.Item>
  )
}
