import { Button, Modal, Typography } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useRemoveCompanyMutation } from '../../../shared'

type DeleteModalProps = {
  companyId: string
}
const { Text } = Typography

export const DeleteModal = ({ companyId }: DeleteModalProps) => {
  const [show, setShow] = useState<boolean>(false)

  const [trigger] = useRemoveCompanyMutation()

  const showModal = () => {
    setShow(true)
  }

  const handleOk = () => {
    trigger({ companyId: companyId }).then(response => {
      alert(response)
      setShow(false)
    })
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
