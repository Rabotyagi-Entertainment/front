import { DeleteModal } from '../../../shared/ui/DeleteModal'
import { NotificationType, useRemoveCompanyMutation } from '../../../shared'
import { notification } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'

interface DeleteInternshipProgressModalProps {
  companyId: string
  refetchCallback: () => void
}

export const DeleteInternshipProgressModal = ({ companyId, refetchCallback }: DeleteInternshipProgressModalProps) => {
  const [trigger] = useRemoveCompanyMutation()

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
    trigger({ companyId: companyId }).then(response => {
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
        title={'Удаление компании'}
        trigger={handleOk}
      />
    </>
  )
}
