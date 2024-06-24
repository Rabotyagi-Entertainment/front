import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

interface DownloadDiaryProps {
  title?: string
  link: string
}

export const DownloadButton = ({ link, title = 'Скачать' }: DownloadDiaryProps) => {
  return (
    <Button
      type={'primary'}
      icon={<DownloadOutlined />}
    >
      <a
        download
        href={link}
        rel='noreferrer'
      >
        {title}
      </a>
    </Button>
  )
}
