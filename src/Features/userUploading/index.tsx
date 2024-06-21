import { JSX, useState } from 'react'
import { Button, Modal, Upload } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'

interface UploadingProps {
  title: string
  fileName: string
  trigger: (file: FormData) => void
  buttonStyle?: 'primary' | 'default'
  icon?: JSX.Element
}

export const UploadingModal = ({
  title,
  trigger,
  fileName,
  buttonStyle = 'primary',
  icon = <PlusOutlined />,
}: UploadingProps) => {
  // const [trigger] = useLoadStudentsMutation()
  const [show, setShow] = useState<boolean>(false)

  const showModal = () => {
    setShow(true)
  }
  const customRequest = (options: any) => {
    const uploadFile = new FormData()
    uploadFile.append(fileName, options.file)
    trigger(uploadFile)
  }

  const handleCancel = () => {
    setShow(false)
  }

  return (
    <>
      <Button
        type={buttonStyle}
        icon={icon}
        onClick={showModal}
      >
        {title}
      </Button>
      <Modal
        title={title}
        open={show}
        onCancel={handleCancel}
        footer={false}
      >
        <Upload
          maxCount={1}
          customRequest={customRequest}
        >
          <Button icon={<UploadOutlined />}>{'Файл .xls'}</Button>
        </Upload>
      </Modal>
    </>
  )
}
