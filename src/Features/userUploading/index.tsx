import { useState } from 'react'
import { Button, Modal, Upload, UploadFile } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { useLoadStudentsMutation } from '../../shared/api/Auth/AuthRequest.ts'

export const UserUploadingModal = () => {
  const [trigger] = useLoadStudentsMutation()
  const [show, setShow] = useState<boolean>(false)
  const [file, setFile] = useState<UploadFile<File> | null>(null)

  const showModal = () => {
    setShow(true)
  }

  const handleOk = () => {
    if (file) {
      trigger({ file: file.originFileObj as File })
    }
  }
  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      await trigger({ file: file })
      onSuccess(null, file)
    } catch (error) {
      onError(error)
    }
  }

  const handleCancel = () => {
    setShow(false)
  }

  return (
    <>
      <Button
        type={'primary'}
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        {'Загрузить студентов'}
      </Button>
      <Modal
        title='Создание дневника практики'
        open={show}
        onCancel={handleCancel}
        footer={[
          <Button
            type='primary'
            onClick={handleOk}
          >
            Создать
          </Button>,
        ]}
      >
        <Upload
          customRequest={customRequest}
          onChange={e => setFile(e.file)}
          fileList={file ? [file] : []}
        >
          <Button icon={<UploadOutlined />}>{'Файл .xls'}</Button>
        </Upload>
      </Modal>
    </>
  )
}
