import { useGetProfileQuery } from '../../../shared/api/Auth/AuthRequest.ts'
import { Card, Typography } from 'antd'

const { Text } = Typography

const Profile = () => {
  const { data } = useGetProfileQuery({})
  return (
    <Card title={data!.fullName}>
      <Text>{`Email - ${data!.email}`}</Text>
      <Text>{`Username Telegram - ${data!.telegramUserName}`}</Text>
      <Text>{`Дата присоединения - ${data!.joinedAt}`}</Text>
      <div>
        <Text>{`Роли`}</Text>
        {data!.roles.map(role => (
          <Text>{role}</Text>
        ))}
      </div>
    </Card>
  )
}

export default Profile
