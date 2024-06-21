import { useState } from 'react'
import { Flex, Modal, Radio, Tag } from 'antd'
import { InternshipProgressEnum } from '../../../shared/types/internshipProgress/InternshipProgressEnum.ts'
import { useChangeStatusMutation } from '../../../shared/api/Internship/InternshipRequest.ts'
import { statusInternshipProgressMapper } from '../../../shared/library/utils/utils.ts'

interface StatusModalProps {
  progressStatus: InternshipProgressEnum
  companyId: string
  refetchCallback: () => void
}

export const StatusModal = ({ progressStatus, companyId, refetchCallback }: StatusModalProps) => {
  const [trigger] = useChangeStatusMutation()
  const [show, setShow] = useState<boolean>(false)

  const showModal = () => {
    setShow(true)
  }

  const handleOk = () => {
    setShow(false)
    refetchCallback()
  }

  const handleCancel = () => {
    setShow(false)
    refetchCallback()
  }
  const handleChangeRequest = (value: InternshipProgressEnum) => {
    trigger({ companyId: companyId, payload: value })
  }

  return (
    <>
      <Tag
        style={{ cursor: 'pointer' }}
        color={statusInternshipProgressMapper[progressStatus].color}
        onClick={showModal}
      >
        {statusInternshipProgressMapper[progressStatus].text}
      </Tag>
      <Modal
        style={{ width: 'fit-content' }}
        title='Статус стажировки'
        open={show}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Flex gap={1}>
          <Radio.Group
            onChange={e => handleChangeRequest(e.target.value)}
            defaultValue={progressStatus}
            style={{ width: '100%' }}
          >
            <Radio.Button
              name={'progressStatus'}
              value={InternshipProgressEnum.DEFAULT}
            >
              {'Не начат'}
            </Radio.Button>
            <Radio.Button
              name={'progressStatus'}
              value={InternshipProgressEnum.SUBMITTED_RESUME}
            >
              {'Отправил резюме'}
            </Radio.Button>
            <Radio.Button
              name={'progressStatus'}
              value={InternshipProgressEnum.IN_SELECTION_PROGRESS}
            >
              {'Прохожу собеседования'}
            </Radio.Button>
            <Radio.Button
              name={'progressStatus'}
              value={InternshipProgressEnum.RECEIVED_OFFER}
            >
              {'Получил оффер'}
            </Radio.Button>
            <Radio.Button
              name={'progressStatus'}
              value={InternshipProgressEnum.REJECT}
            >
              {'Отказ'}
            </Radio.Button>
            <Radio.Button
              name={'progressStatus'}
              value={InternshipProgressEnum.ACCEPT_OFFER}
            >
              {'Принял оффер'}
            </Radio.Button>
          </Radio.Group>
        </Flex>
      </Modal>
    </>
  )
}
