import { DeleteModal } from '../../../shared/ui/DeleteModal'
import { NotificationType, useDeleteDiaryMutation } from '../../../shared'
import { notification } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'

interface DeleteDiaryModalProps {
  diaryId: string
  refetchCallback: () => void
}

export const DeleteDiaryModal = ({ diaryId, refetchCallback }: DeleteDiaryModalProps) => {
  const [trigger] = useDeleteDiaryMutation()

  const [api, contextHolder] = notification.useNotification()

  const openNotification = ({ type, message, content }: NotificationType) => {
    api.open({
      message: message,
      description: content,
      placement: 'topRight',
      type: type,
      icon: <CloseCircleOutlined style={{ color: 'red' }} />,
    })
  }

  const handleOk = () => {
    trigger({ diaryId: diaryId }).then(response => {
      if (!response.error) {
        refetchCallback()
      } else {
        openNotification({
          type: 'error',
          //@ts-ignore
          message: `Ошибка - ${response.error.status}`,
          //@ts-ignore
          content: response.error.data.Message,
        })
      }
    })
  }

  return (
    <>
      {contextHolder}
      <DeleteModal
        trigger={handleOk}
        title={'Удаление дневника'}
      />
    </>
  )
}
