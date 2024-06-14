import { UserWithCompany } from '../../../shared/types/user/UserWithCompany.ts'
import { Card } from 'antd'
import { Link } from 'react-router-dom'

interface StudentItemProps {
  item: UserWithCompany
}

export const StudentItem = ({ item: { name, group, id, companies } }: StudentItemProps) => {
  return (
    <Card
      title={name}
      extra={group}
    >
      <div>
        {companies.map(({ name }) => (
          <p key={id}>{name}</p>
        ))}
      </div>
      <Link to={`students/${id}/internship`}>{'Стажировки'}</Link>
      <Link to={`students/${id}/diaries`}>{'Дневники'}</Link>
    </Card>
  )
}
