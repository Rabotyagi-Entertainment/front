import { useState } from 'react'
import { Button, Flex, Modal, Radio } from 'antd'
import { InternshipProgressEnum } from '../../../shared/types/internshipProgress/InternshipProgressEnum.ts'
import { useChangeStatusMutation } from '../../../shared/api/Internship/InternshipRequest.ts'

interface StatusModalProps {
  progressStatus: InternshipProgressEnum
  companyId: string
}

const statusMapper = {
  [InternshipProgressEnum.DEFAULT]: 'Не начал',
  [InternshipProgressEnum.SUBMITTED_RESUME]: 'Отправил резюме',
  [InternshipProgressEnum.IN_SELECTION_PROGRESS]: 'Прохожу собеседования',
  [InternshipProgressEnum.REJECT]: 'Отказ',
  [InternshipProgressEnum.RECIEVED_OFFER]: 'Получил оффер',
  [InternshipProgressEnum.ACCEPT_OFFER]: 'Принял оффер',
}

export const StatusModal = ({ progressStatus, companyId }: StatusModalProps) => {
  const [trigger] = useChangeStatusMutation()
  const [show, setShow] = useState<boolean>(false)

  const showModal = () => {
    setShow(true)
  }

  const handleOk = () => {
    setShow(false)
  }

  const handleCancel = () => {
    setShow(false)
  }
  const handleChangeRequest = (value: InternshipProgressEnum) => {
    trigger({ companyId: companyId, payload: value })
  }

  return (
    <>
      <Button onClick={showModal}>{statusMapper[progressStatus]}</Button>
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
              value={InternshipProgressEnum.RECIEVED_OFFER}
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
