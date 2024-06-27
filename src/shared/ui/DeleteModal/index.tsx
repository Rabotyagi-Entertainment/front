import { Button, Modal, Typography } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'

type DeleteModalProps = {
  trigger: () => void
  title: string
}
const { Text } = Typography

export const DeleteModal = ({ trigger, title }: DeleteModalProps) => {
  const [show, setShow] = useState<boolean>(false)

  const showModal = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    setShow(true)
  }

  const handleOk = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    trigger()
  }

  const handleCancel = () => {
    setShow(false)
  }

  return (
    <>
      <Button
        ghost
        onClick={showModal}
      >
        <DeleteOutlined style={{ color: 'red' }} />
      </Button>
      <Modal
        title={title}
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
