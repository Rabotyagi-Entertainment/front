import { useLoadStudentsMutation } from '../../../shared/api/Auth/AuthRequest.ts'
import { UploadingModal } from '../../../Features/userUploading'

export const UserUploading = () => {
  const [trigger] = useLoadStudentsMutation()

  const handleUserUploading = (file: FormData) => {
    trigger({ file: file })
  }

  return (
    <UploadingModal
      title={'Загрузить список студентов'}
      fileName={'studentsTable.xls'}
      trigger={handleUserUploading}
    />
  )
}
