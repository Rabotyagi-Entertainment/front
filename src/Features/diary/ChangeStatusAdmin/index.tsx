import { DiaryStatusMapper } from '../../../shared/library/utils/utils.ts'
import { ChangeStatus } from '../../../entities/ui/ChangeStatus'
import { OptionProps } from 'antd/es/mentions'
import { DiaryStateTypeEnum } from '../../../shared/types/diary/DiaryStateTypeEnum.ts'
import { useDiaryStateChangeMutation } from '../../../shared/api/DiaryAdmin/DiaryAdminRequest.ts'

const options: OptionProps['option'] = [
  {
    value: DiaryStateTypeEnum.DRAFT,
    label: DiaryStatusMapper[DiaryStateTypeEnum.DRAFT].text,
  },
  {
    value: DiaryStateTypeEnum.ON_DEAN_CHECK,
    label: DiaryStatusMapper[DiaryStateTypeEnum.ON_DEAN_CHECK].text,
  },
  {
    value: DiaryStateTypeEnum.DEAN_APPROVED,
    label: DiaryStatusMapper[DiaryStateTypeEnum.DEAN_APPROVED].text,
  },
  {
    value: DiaryStateTypeEnum.ON_MENTOR_CHECK,
    label: DiaryStatusMapper[DiaryStateTypeEnum.ON_MENTOR_CHECK].text,
  },
  {
    value: DiaryStateTypeEnum.MENTOR_APPROVED,
    label: DiaryStatusMapper[DiaryStateTypeEnum.MENTOR_APPROVED].text,
  },
  {
    value: DiaryStateTypeEnum.ON_COMPANY_CHECK,
    label: DiaryStatusMapper[DiaryStateTypeEnum.ON_COMPANY_CHECK].text,
  },
  {
    value: DiaryStateTypeEnum.ON_DEAN_SIGNATURE,
    label: DiaryStatusMapper[DiaryStateTypeEnum.ON_DEAN_SIGNATURE].text,
  },
  {
    value: DiaryStateTypeEnum.DONE,
    label: DiaryStatusMapper[DiaryStateTypeEnum.DONE].text,
  },
]

interface StatusModalProps {
  progressStatus: DiaryStateTypeEnum
  diaryId: string
  refetchCallback: () => void
}

export const ChangeStatusAdmin = ({ progressStatus, diaryId, refetchCallback }: StatusModalProps) => {
  const [trigger] = useDiaryStateChangeMutation()
  const handleChangeRequest = (value: string) => {
    trigger({ diaryId: diaryId, payload: value as DiaryStateTypeEnum }).then(() => refetchCallback())
  }

  return (
    <ChangeStatus
      defaultValue={progressStatus}
      options={options}
      fetchCallback={handleChangeRequest}
    />
  )
}
