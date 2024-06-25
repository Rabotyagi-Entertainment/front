import { useChangeStatusMutation, InternshipProgressEnum } from '../../../shared'
import { statusInternshipProgressMapper } from '../../../shared/library/utils/utils.ts'
import { ChangeStatus } from '../../../entities'
import { OptionProps } from 'antd/es/mentions'

const options: OptionProps['option'] = [
  {
    value: InternshipProgressEnum.DEFAULT,
    label: statusInternshipProgressMapper[InternshipProgressEnum.DEFAULT].text,
  },
  {
    value: InternshipProgressEnum.SUBMITTED_RESUME,
    label: statusInternshipProgressMapper[InternshipProgressEnum.SUBMITTED_RESUME].text,
  },
  {
    value: InternshipProgressEnum.IN_SELECTION_PROGRESS,
    label: statusInternshipProgressMapper[InternshipProgressEnum.IN_SELECTION_PROGRESS].text,
  },
  {
    value: InternshipProgressEnum.RECEIVED_OFFER,
    label: statusInternshipProgressMapper[InternshipProgressEnum.RECEIVED_OFFER].text,
  },
  {
    value: InternshipProgressEnum.REJECT,
    label: statusInternshipProgressMapper[InternshipProgressEnum.REJECT].text,
  },
  {
    value: InternshipProgressEnum.ACCEPT_OFFER,
    label: statusInternshipProgressMapper[InternshipProgressEnum.ACCEPT_OFFER].text,
  },
]

interface StatusModalProps {
  progressStatus: InternshipProgressEnum
  companyId: string
  refetchCallback: () => void
}

export const StatusModal = ({ progressStatus, companyId, refetchCallback }: StatusModalProps) => {
  const [trigger] = useChangeStatusMutation()
  const handleChangeRequest = (value: string) => {
    trigger({ companyId: companyId, payload: value as InternshipProgressEnum }).then(() => refetchCallback())
  }

  return (
    <ChangeStatus
      defaultValue={progressStatus}
      options={options}
      fetchCallback={handleChangeRequest}
    />
  )
}
