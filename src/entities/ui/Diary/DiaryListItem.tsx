import { DiaryType } from '../../../shared/types/diary/Diary.ts'
import { Card, Typography } from 'antd'

interface DiaryListItemProps {
  item: DiaryType
}

const { Text } = Typography
export const DiaryListItem = ({
  item: {
    id,
    createdAt,
    diaryType,
    studentFullName,
    curatorFullName,
    taskReportTable,
    studentCharacteristics,
    companyName,
    orderNumber,
    workName,
    planTable,
  },
}: DiaryListItemProps) => {
  return (
    <Card
      key={id + 'inner'}
      title={<span>{`${workName} - ${createdAt}`}</span>}
    >
      <span>{`Тип Дневника - ${diaryType}`}</span>
      <span>{`Компания - ${companyName}`}</span>
      <span>{`Студент - ${studentFullName}`}</span>
      <span>{`Куратор - ${curatorFullName}`}</span>
      <span>{`Приказ - ${orderNumber}`}</span>
      <div>
        <span>{`Характеристика`}</span>
        <Text>{studentCharacteristics}</Text>
      </div>
      <div>
        <span>{`Таблица с здачами`}</span>
        <Text>{taskReportTable}</Text>
      </div>
      <div>
        <span>{`Планирование`}</span>
        <Text>{planTable}</Text>
      </div>
    </Card>
  )
}
