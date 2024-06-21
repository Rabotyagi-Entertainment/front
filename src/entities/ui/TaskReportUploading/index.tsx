import { UploadingModal } from '../../../Features/userUploading'
import { useLoadReportMutation } from '../../../shared/api/Diary/DiaryRequest.ts'
import { UploadOutlined } from '@ant-design/icons'

interface TaskReportUploadingProps {
  diaryId: string
}

export const TaskReportUploading = ({ diaryId }: TaskReportUploadingProps) => {
  const [trigger] = useLoadReportMutation()

  const handleReportUploading = (file: FormData) => {
    trigger({ file: file, diaryId: diaryId })
  }

  return (
    <UploadingModal
      icon={<UploadOutlined />}
      buttonStyle={'default'}
      title={'Таблица с Задачами'}
      fileName={'taskReport.xls'}
      trigger={handleReportUploading}
    />
  )
}
