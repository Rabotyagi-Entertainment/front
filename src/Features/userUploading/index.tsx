import { JSX, useState } from 'react'
import { Button, Flex, Modal, notification, Tooltip, Upload, UploadFile, UploadProps } from 'antd'
import { CloseCircleOutlined, InfoCircleOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons'
import { NotificationType } from '../../shared'

interface UploadingProps {
  title: string
  url: string
  buttonStyle?: 'primary' | 'default'
  icon?: JSX.Element
  info?: string
}

export const UploadingModal = ({
  title,
  url,
  info,
  buttonStyle = 'primary',
  icon = <PlusOutlined />,
}: UploadingProps) => {
  const [show, setShow] = useState<boolean>(false)
  const showModal = () => {
    setShow(true)
  }

  const [fileList, setFileList] = useState<UploadFile[]>()

  const handleChange: UploadProps['onChange'] = info => {
    setFileList(info.fileList)
  }
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

  const customRequest = async (options: any) => {
    const { file } = options
    setFileList([file])
    const uploadFile = new FormData()
    uploadFile.append('file', file)
    await fetch(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('userToken')}`,
        // 'Content-Type': 'multipart/form-data',
        Origin: 'https://deploy--clever-kleicha-19288a.netlify.app/',
        Referer: 'https://deploy--clever-kleicha-19288a.netlify.app/admin/lists',
      },
      method: 'POST',
      body: uploadFile,
    }).then(res => {
      openNotification({
        type: 'info',
        // @ts-ignore
        message: `Ошибка - ${res.json()}`,
        content: '',
      })
      res.json()
    })
  }

  const handleCancel = () => {
    setShow(false)
  }

  return (
    <>
      {contextHolder}
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
        <Flex gap={'1rem'}>
          <Upload
            accept={'.xlsx'}
            maxCount={1}
            customRequest={customRequest}
            fileList={fileList}
            onChange={handleChange}
          >
            <Button icon={<UploadOutlined />}>{'Файл .xlsx'}</Button>
          </Upload>
          {info && (
            <Tooltip
              trigger={'hover'}
              title={info}
            >
              <InfoCircleOutlined />
            </Tooltip>
          )}
        </Flex>
      </Modal>
    </>
  )
}
