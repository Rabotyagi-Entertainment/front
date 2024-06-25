import { UserWithCompany } from '../../../shared/types/user/UserWithCompany.ts'
import { List, Flex, Typography } from 'antd'
import { NavLink } from 'react-router-dom'
import { ArrowRightOutlined } from '@ant-design/icons'
import { RouteType } from '../../../app/routes/RouteType.ts'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { FieldLabel } from '../../../shared/ui/FieldLabel'

interface StudentItemProps {
  item: UserWithCompany
}

const { Title } = Typography

export const StudentItem = ({ item: { name, group, id } }: StudentItemProps) => {
  const breakPoint = useBreakpoint()
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
          level={breakPoint.sm ? 4 : 5}
        >{`${name} - ${group}`}</Title>
        <Flex
          gap={'1rem'}
          vertical={breakPoint.xs}
        >
          <NavLink to={`${RouteType.ADMIN_INTERNSHIP}/${id}`}>
            <FieldLabel title={'Стажировки '}>
              <ArrowRightOutlined />
            </FieldLabel>
          </NavLink>
          <NavLink to={`${RouteType.ADMIN_INTERNSHIP_PROGRESS}/${id}`}>
            <FieldLabel title={'Собеседования '}>
              <ArrowRightOutlined />
            </FieldLabel>
          </NavLink>
        </Flex>
      </Flex>
    </List.Item>
  )
}
