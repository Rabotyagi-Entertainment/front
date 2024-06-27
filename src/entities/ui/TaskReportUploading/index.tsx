import { UploadingModal } from '../../../Features'
import { UploadOutlined } from '@ant-design/icons'
import { baseUrl } from '../../../shared'

interface TaskReportUploadingProps {
  diaryId: string
  title: string
}

export const TaskReportUploading = ({ title, diaryId }: TaskReportUploadingProps) => {
  return (
    <UploadingModal
      info={'Формат задач: Дата начала | Дата окончания | Название'}
      icon={<UploadOutlined />}
      buttonStyle={'default'}
      title={title}
      url={baseUrl + `diary/${diaryId}/xls-file`}
    />
  )
}
