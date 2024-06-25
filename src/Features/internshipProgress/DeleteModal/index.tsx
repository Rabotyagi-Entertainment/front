import { Button, Modal, notification, Typography } from 'antd'
import { CloseCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { NotificationType, useRemoveCompanyMutation } from '../../../shared'

type DeleteModalProps = {
  companyId: string
  refetchCallback: () => void
}
const { Text } = Typography

export const DeleteModal = ({ companyId, refetchCallback }: DeleteModalProps) => {
  const [show, setShow] = useState<boolean>(false)

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

  const showModal = () => {
    setShow(true)
  }

  const handleOk = () => {
    trigger({ companyId: companyId }).then(response => {
      if (!response.error) {
        refetchCallback()
        setShow(false)
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

  const handleCancel = () => {
    setShow(false)
  }

  return (
    <>
      {contextHolder}
      <Button
        ghost
        onClick={showModal}
      >
        <DeleteOutlined style={{ color: 'red' }} />
      </Button>
      <Modal
        title={'Удаление компании'}
        open={show}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={
          <>
            <Button
              onClick={handleOk}
              style={{ backgroundColor: 'red' }}
            >
              Удалить
            </Button>
            <Button onClick={handleCancel}>Отмена</Button>
          </>
        }
      >
        <Text>{'Подтвердите удаление'}</Text>
      </Modal>
    </>
  )
}
