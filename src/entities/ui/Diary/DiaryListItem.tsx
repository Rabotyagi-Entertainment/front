import { Button, Card, Flex, Typography, Upload } from 'antd'
import { UserDiary } from '../../../shared/types/diary/UserDiary.ts'
import { DiaryTypeEnum } from '../../../shared/types/diary/DiaryTypeEnum.ts'
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons'

interface DiaryListItemProps {
  item: UserDiary
}

const typeMapper = {
  [DiaryTypeEnum.DEFAULT]: 'Стандартный дневник',
  [DiaryTypeEnum.COURSE]: 'Курсовая',
  [DiaryTypeEnum.GRADUATION]: 'Диплом',
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
  const year = `${createdAt.split('-')[0]}`
  return (
    <Card
      key={id + 'inner'}
      title={<span>{`${typeMapper[diaryType]} ${workName ? workName : 'Без названия'} : ${year}`}</span>}
    >
      <Flex vertical>
        <Text>{`Компания - ${companyName}`}</Text>
        <Text>{`Студент - ${studentFullName}`}</Text>
        <Text>{`Куратор - ${curatorFullName}`}</Text>
        <Text>{`Приказ - ${orderNumber}`}</Text>
        <Flex
          vertical
          gap={5}
        >
          <Text strong>{`Характеристика: `}</Text>
          {studentCharacteristics ? (
            <Button icon={<DownloadOutlined />} />
          ) : (
            <Upload>
              <Button icon={<UploadOutlined />}>Загрузить</Button>
            </Upload>
          )}
        </Flex>
        <Flex
          vertical
          gap={5}
        >
          <Text strong>{`Таблица с здачами`}</Text>
          {taskReportTable ? (
            <Button icon={<DownloadOutlined />} />
          ) : (
            <Upload>
              <Button icon={<UploadOutlined />}>Загрузить</Button>
            </Upload>
          )}
        </Flex>
        <Flex
          vertical
          gap={5}
        >
          <Text strong>{`Планирование`}</Text>
          {planTable ? (
            <Button icon={<DownloadOutlined />} />
          ) : (
            <Upload>
              <Button icon={<UploadOutlined />}>Загрузить</Button>
            </Upload>
          )}
        </Flex>
      </Flex>
    </Card>
  )
}
