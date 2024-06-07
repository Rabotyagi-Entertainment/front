import { Company } from '../../../shared/types/internship/Company.ts'
import { Card, List, Typography } from 'antd'
import { StatusEnum } from '../../../shared/types/internship/Status.ts'

interface InternshipItemProps {
  item: Company
}
const { Text } = Typography

const statusMapper = {
  [StatusEnum.CV]: 'Подал резюме',
  [StatusEnum.REJECT]: 'Отказ',
  [StatusEnum.OFFER]: 'Получил оффер',
  [StatusEnum.MEETING]: 'Собеседование',
}

export const InternshipItem = ({
  item: { internshipProgressId, companyName, comments, status },
}: InternshipItemProps) => {
  return (
    <Card
      key={internshipProgressId}
      title={companyName}
    >
      <Text>{`Статус - ${statusMapper[status]}`}</Text>
      <List>
        {comments.map((comment, number) => (
          <Text key={number}>{`${comment.author} - ${comment.text}`}</Text>
        ))}
      </List>
    </Card>
  )
}
