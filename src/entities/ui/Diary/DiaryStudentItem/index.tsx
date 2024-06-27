import { Button, Card, Flex, notification, Tag, Typography } from 'antd'
import {
  UserDiary,
  DiaryTypeEnum,
  FieldLabel,
  baseUrl,
  MessageCredential,
  useLeaveCommentDiaryMutation,
  NotificationType,
  useLazyGetMyDiaryFileQuery,
} from '../../../../shared'
import { DiaryStatusMapper, WorkModeMapper } from '../../../../shared/library/utils/utils.ts'
import { CommentsModal, DownloadButton, EditInformation } from '../../../../Features'
import { TaskReportUploading } from '../../TaskReportUploading'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { CloseCircleOutlined, DownloadOutlined, InfoCircleOutlined } from '@ant-design/icons'

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
  const [QuerryTrigger] = useLazyGetMyDiaryFileQuery()
  const breakPoint = useBreakpoint()
  const [api, contextHolder] = notification.useNotification()

  const openNotification = ({ type, message, content }: NotificationType) => {
    api.open({
      message: message,
      description: content,
      placement: 'top',
      type: 'info',
      icon:
        type === 'error' ? (
          <CloseCircleOutlined style={{ color: 'red' }} />
        ) : (
          <InfoCircleOutlined style={{ color: 'blue' }} />
        ),
    })
  }

  const handleDownload = () => {
    QuerryTrigger({ diaryId: id }).then(response => {
      if (!response.error) {
        openNotification({ type: 'success', message: `Файл придёт в телеграм бот`, content: '' })
      } else {
        openNotification({
          type: 'error',
          // @ts-ignore
          message: `Ошибка - ${response.error.status}`,
          // @ts-ignore
          content: response.error.data.Message,
        })
      }
    })
  }

  const handleSendComments = ({ text }: MessageCredential) => {
    trigger({ diaryId: id, text: text }).then(() => refetchCallback())
  }

  const year = `${createdAt.split('-')[0]}`
  return (
    <Card
      key={id + 'inner'}
      title={
        <Flex
          style={{ margin: '0.5rem 0' }}
          gap={'0.5rem'}
          vertical={breakPoint.xs}
          justify={'space-between'}
        >
          {contextHolder}
          <Flex
            vertical={breakPoint.xs}
            gap={'1rem'}
            align={'center'}
          >
            <Tag
              color={DiaryStatusMapper[diaryState].color}
              style={{ alignContent: 'center' }}
            >
              <Text style={{ color: 'white' }}>{DiaryStatusMapper[diaryState].text}</Text>
            </Tag>
            <Text>{`${WorkModeMapper[diaryType]} ${workName ? workName : ''} : ${year}`}</Text>
          </Flex>
          <Flex
            gap={'1rem'}
            justify={'center'}
            align={'center'}
          >
            <CommentsModal
              refetchCallback={refetchCallback}
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
            {sessionStorage.getItem('telegramView') !== '' ? (
              <Button
                type={'primary'}
                onClick={handleDownload}
              >
                <DownloadOutlined />
              </Button>
            ) : (
              <DownloadButton
                iconInner={!breakPoint.sm}
                link={`${baseUrl}diary/${id}`}
                title={breakPoint.sm ? 'Скачать файл' : ''}
              />
            )}
          </Flex>
        </Flex>
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
