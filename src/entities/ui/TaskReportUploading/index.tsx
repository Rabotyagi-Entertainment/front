import { UploadingModal } from '../../../Features/userUploading'
import { UploadOutlined } from '@ant-design/icons'
import { baseUrl } from '../../../shared/api/static/authConfig.ts'

interface TaskReportUploadingProps {
  diaryId: string
}

export const TaskReportUploading = ({ diaryId }: TaskReportUploadingProps) => {
  return (
    <UploadingModal
      icon={<UploadOutlined />}
      buttonStyle={'default'}
      title={'Таблица с Задачами'}
      url={baseUrl + `diary/${diaryId}/xls-file`}
    />
  )
}
