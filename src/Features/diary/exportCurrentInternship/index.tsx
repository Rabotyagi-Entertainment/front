import { Button } from 'antd'
import { DownloadOutlined } from '@ant-design/icons'
import { useExportStudentsTableQuery } from '../../../shared/api/DiaryAdmin/DiaryAdminRequest.ts'
import { useRef } from 'react'

export const ExportCurrentInternship = () => {
  const { data, isLoading } = useExportStudentsTableQuery({})
  const linkRef = useRef<HTMLAnchorElement>(null)

  return (
    <Button
      type={'primary'}
      loading={isLoading}
      icon={<DownloadOutlined />}
    >
      <a
        ref={linkRef}
        href={`./${data}`}
        download
      >
        {'Экспорт студентов'}
      </a>
    </Button>
  )
}
