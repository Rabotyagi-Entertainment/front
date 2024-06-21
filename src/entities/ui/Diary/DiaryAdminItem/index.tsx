import { Button, Card, Flex, Tag, Typography } from 'antd'
import { UserDiary } from '../../../../shared/types/diary/UserDiary.ts'
import { DownloadOutlined } from '@ant-design/icons'
import { DiaryStatusMapper, WorkModeMapper } from '../../../../shared/library/utils/utils.ts'
import { FieldLabel } from '../../../../shared/ui/FieldLabel'
import { CommentsModal } from '../../../../Features/internshipProgress/Comments'
import { ChangeStatusAdmin } from '../../../../Features/diary/ChangeStatusAdmin'
import { useLeaveCommentAdminMutation } from '../../../../shared/api/DiaryAdmin/DiaryAdminRequest.ts'

interface DiaryListItemProps {
  item: UserDiary
  refetchCallback: () => void
}

type MessageCredentials = { value: string; id: string }

const { Text } = Typography
export const DiaryAdminListItem = ({
  item: {
    id,
    createdAt,
    diaryType,
    diaryState,
    studentFullName,
    curatorFullName,
    studentCharacteristics,
    companyName,
    orderNumber,
    comments,
    workName,
  },
  refetchCallback,
}: DiaryListItemProps) => {
  const [trigger] = useLeaveCommentAdminMutation()

  const handleSendComments = ({ value }: MessageCredentials) => {
    trigger({ diaryId: id, text: value }).then(() => refetchCallback())
  }

  const year = `${createdAt.split('-')[0]}`
  return (
    <Card
      key={id + 'inner'}
      title={
        <span style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Flex
            gap={'1rem'}
            align={'center'}
          >
            <Tag
              color={DiaryStatusMapper[diaryState].color}
              style={{ alignContent: 'center' }}
            >
              <Text style={{ color: 'white' }}>{DiaryStatusMapper[diaryState].text}</Text>
            </Tag>
            <span>{`${WorkModeMapper[diaryType]} ${workName ? workName : ''} : ${year}`}</span>
          </Flex>
          <ChangeStatusAdmin
            progressStatus={diaryState}
            diaryId={id}
            refetchCallback={refetchCallback}
          />
          <Flex gap={'1rem'}>
            <CommentsModal
              comments={comments}
              title={'Комментарии дневника'}
              id={id}
              sendMessageCallback={handleSendComments}
            />
          </Flex>
        </span>
      }
    >
      <Flex
        vertical
        gap={5}
      >
        <FieldLabel title={'Компания - '}>{companyName ? companyName : 'Не добавлено'}</FieldLabel>
        <FieldLabel title={'Студент - '}>{studentFullName ? studentFullName : 'Не добавлено'}</FieldLabel>
        <FieldLabel title={'Куратор - '}>{curatorFullName ? curatorFullName : 'Не добавлено'}</FieldLabel>
        <FieldLabel title={'Приказ - '}>{orderNumber ? orderNumber : 'Не добавлено'}</FieldLabel>
        <FieldLabel title={'Характеристика: '}>
          {studentCharacteristics ? <Button icon={<DownloadOutlined />} /> : <Text>{'Не добавлено'}</Text>}
        </FieldLabel>
      </Flex>
    </Card>
  )
}
