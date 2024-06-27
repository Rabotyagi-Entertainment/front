import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

interface DownloadDiaryProps {
  title?: string
  link: string
  iconInner?: boolean
}

export const DownloadButton = ({ link, iconInner = false, title = 'Скачать' }: DownloadDiaryProps) => {
  return (
    <Button
      type={'primary'}
      icon={!iconInner && <DownloadOutlined />}
    >
      <a
        download
        href={link}
        rel='noreferrer'
      >
        {iconInner && <DownloadOutlined />}
        {title}
      </a>
    </Button>
  )
}
