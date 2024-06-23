import { JSX, useState } from 'react'
import { Button, Modal, Upload, UploadFile, UploadProps } from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'

interface UploadingProps {
  title: string
  url: string
  buttonStyle?: 'primary' | 'default'
  icon?: JSX.Element
}

export const UploadingModal = ({ title, url, buttonStyle = 'primary', icon = <PlusOutlined /> }: UploadingProps) => {
  const [show, setShow] = useState<boolean>(false)
  const showModal = () => {
    setShow(true)
  }

  const [fileList, setFileList] = useState<UploadFile[]>()

  const handleChange: UploadProps['onChange'] = info => {
    setFileList(info.fileList)
  }

  const customRequest = async (options: any) => {
    const { file } = options
    const uploadFile = new FormData()
    uploadFile.append('file', file)

    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        // 'Content-Type': 'multipart/form-data',
        Origin: 'http://localhost:5173',
        Referer: 'http://localhost:5173/admin/lists',
      },
      method: 'POST',
      body: uploadFile,
    }).then(res => res.json())
    alert(JSON.stringify(`${res.message}, status: ${res.status}`))
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
          accept={'.xls'}
          maxCount={1}
          customRequest={customRequest}
          fileList={fileList}
          onChange={handleChange}
        >
          <Button icon={<UploadOutlined />}>{'Файл .xls'}</Button>
        </Upload>
      </Modal>
    </>
  )
}
