import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'

interface DownloadingFileProps {
  title: string
  file: any
  fileName: string
}

export const DownloadingFile = ({ title, file, fileName }: DownloadingFileProps) => {
  console.log(file)
  const onHandleDownload = () => {
    const link = document.createElement('a')
    link.setAttribute('download', fileName)

    document.body.appendChild(link)

    link.click()

    link.parentNode!.removeChild(link)
  }

  return (
    <Button
      type={'primary'}
      icon={<DownloadOutlined />}
      onClick={onHandleDownload}
    >
      {title}
    </Button>
  )
}
