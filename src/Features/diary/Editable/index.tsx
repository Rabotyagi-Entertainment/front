import { PropsWithChildren, useState } from 'react'
import { GeneralInformation } from './GeneralInformation'
import { AdditionalInformation } from './AdditionalInformation'

import { Button, Modal } from 'antd'
import { EditOutlined } from '@ant-design/icons'

interface EditInformationProps extends PropsWithChildren {
  refetchCallback: () => void
}
type EditInformationNotation = {
  General: typeof GeneralInformation
  Additional: typeof AdditionalInformation
}

export const EditInformation: React.FC<EditInformationProps> & EditInformationNotation = ({
  children,
  refetchCallback,
}) => {
  const [show, setShow] = useState<boolean>(false)

  const showModal = () => {
    setShow(true)
  }

  const handleOk = () => {
    refetchCallback()
    setShow(false)
  }

  const handleCancel = () => {
    refetchCallback()
    setShow(false)
  }

  return (
    <>
      <Button
        type={'primary'}
        icon={<EditOutlined />}
        onClick={showModal}
      />
      <Modal
        title='Редактирование информации'
        open={show}
        onCancel={handleCancel}
        footer={[
          <Button
            type='primary'
            onClick={handleOk}
          >
            Редактировать
          </Button>,
        ]}
      >
        {children}
      </Modal>
    </>
  )
}

EditInformation.General = GeneralInformation
EditInformation.Additional = AdditionalInformation
