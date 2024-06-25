import { Card, Flex, Tag, Typography } from 'antd'
import { UserDiary } from '../../../../shared/types/diary/UserDiary.ts'
import { DiaryStatusMapper, WorkModeMapper } from '../../../../shared/library/utils/utils.ts'
import { EditInformation } from '../../../../Features/diary/Editable'
import { DiaryTypeEnum } from '../../../../shared/types/diary/DiaryTypeEnum.ts'
import { FieldLabel } from '../../../../shared/ui/FieldLabel'
import { CommentsModal } from '../../../../Features/internshipProgress/Comments'
import { useLeaveCommentDiaryMutation } from '../../../../shared/api/Diary/DiaryRequest.ts'
import { TaskReportUploading } from '../../TaskReportUploading'
import { CommentCredentials } from '../../../../shared/types/comment/CommentCredentials.ts'
import { DownloadButton } from '../../../../Features/diary/DownloadDiary'
import { baseUrl } from '../../../../shared/api/static/authConfig.ts'

interface DiaryListItemProps {
  item: UserDiary
  refetchCallback: () => void
}

const { Text } = Typography
export const DiaryListItem = ({
  item: {
    id,
    createdAt,
    diaryType,
    diaryState,
    studentFullName,
    curatorFullName,
    taskReportTable,
    studentCharacteristics,
    companyName,
    orderNumber,
    comments,
    workName,
    planTable,
  },
  refetchCallback,
}: DiaryListItemProps) => {
  const [trigger] = useLeaveCommentDiaryMutation()

  const handleSendComments = ({ text }: CommentCredentials) => {
    trigger({ diaryId: id, text: text }).then(() => refetchCallback())
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
          <Flex gap={'1rem'}>
            <CommentsModal
              comments={comments}
              title={'Комментарии дневника'}
              id={id}
              sendMessageCallback={handleSendComments}
            />
            <EditInformation refetchCallback={refetchCallback}>
              <EditInformation.General
                diaryId={id}
                orderNumber={orderNumber ? orderNumber : null}
                curatorFullName={curatorFullName ? curatorFullName : null}
                studentCharacteristics={studentCharacteristics}
              />
              {!(diaryType === DiaryTypeEnum.DEFAULT) && (
                <EditInformation.Additional
                  diaryId={id}
                  workName={workName ? workName : null}
                  planTable={planTable ? planTable : null}
                />
              )}
            </EditInformation>
            <DownloadButton
              link={`${baseUrl}diary/${id}`}
              title={'Скачать файл'}
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
        <FieldLabel title={'Характеристика - '}>
          {studentCharacteristics ? studentCharacteristics : 'Не добавлено'}
        </FieldLabel>
        {!(diaryType === DiaryTypeEnum.DEFAULT) && planTable && (
          <FieldLabel title={'Планирование работы:'}>{planTable}</FieldLabel>
        )}
        <FieldLabel title={'Таблица с здачами:'}>
          {taskReportTable ? (
            <>
              <Tag color={'green'}>{'Загружено'}</Tag>
              <TaskReportUploading
                title={'Изменить'}
                diaryId={id}
              />
            </>
          ) : (
            <TaskReportUploading
              title={'Загрузить'}
              diaryId={id}
            />
          )}
        </FieldLabel>
      </Flex>
    </Card>
  )
}
