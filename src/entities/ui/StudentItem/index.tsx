import { UserWithCompany } from '../../../shared/types/user/UserWithCompany.ts'
import { List, Flex, Dropdown, Button, MenuProps, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { ArrowRightOutlined, DownOutlined } from '@ant-design/icons'

interface StudentItemProps {
  item: UserWithCompany
}

const { Title, Text } = Typography

const createOptions = (companies: string[]): MenuProps['items'] => {
  return companies.map((item, number) => {
    return {
      label: <Text>{item}</Text>,
      key: number.toString(),
    }
  })
}

export const StudentItem = ({ item: { name, group, id, companies } }: StudentItemProps) => {
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
        <Dropdown menu={{ items: createOptions(companies) }}>
          <Button icon={<DownOutlined />}>{'Компании'}</Button>
        </Dropdown>
        <Flex gap={'1rem'}>
          <Link to={`/students/${id}/internship`}>
            <Flex gap={5}>
              <span> {'Стажировки'}</span>
              <ArrowRightOutlined />
            </Flex>
          </Link>
          <Link to={`/students/${id}/diaries`}>
            <Flex gap={5}>
              <span> {'Дневники'}</span>
              <ArrowRightOutlined />
            </Flex>
          </Link>
        </Flex>
      </Flex>
    </List.Item>
  )
}
