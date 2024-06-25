import { UploadingModal } from '../../../Features/userUploading'
import { UploadOutlined } from '@ant-design/icons'
import { baseUrl } from '../../../shared/api/static/authConfig.ts'

interface TaskReportUploadingProps {
  diaryId: string
  title: string
}

export const TaskReportUploading = ({ title, diaryId }: TaskReportUploadingProps) => {
  return (
    <UploadingModal
      icon={<UploadOutlined />}
      buttonStyle={'default'}
      title={title}
      url={baseUrl + `diary/${diaryId}/xls-file`}
    />
  )
}
