import { useState } from 'react'
import { Button, Modal, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { DiaryTypeEnum, useCreatePracticeDiaryMutation } from '../../../shared'
import { WorkModeMapper } from '../../../shared/library/utils/utils.ts'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'

interface CreateDiaryModalProps {
  internshipId: string
  refetchCallback: () => void
}
const templates = [
  {
    value: DiaryTypeEnum.DEFAULT,
    label: WorkModeMapper[DiaryTypeEnum.DEFAULT],
  },
  {
    value: DiaryTypeEnum.COURSE,
    label: WorkModeMapper[DiaryTypeEnum.COURSE],
  },
  {
    value: DiaryTypeEnum.GRADUATION,
    label: WorkModeMapper[DiaryTypeEnum.GRADUATION],
  },
]

export const CreateDiaryModal = ({ internshipId, refetchCallback }: CreateDiaryModalProps) => {
  const [trigger] = useCreatePracticeDiaryMutation()
  const [value, setValue] = useState<DiaryTypeEnum>(DiaryTypeEnum.DEFAULT)
  const [show, setShow] = useState<boolean>(false)
  const breakPoint = useBreakpoint()

  const showModal = () => {
    setShow(true)
  }

  const handleOk = () => {
    trigger({ internshipId: internshipId, diaryType: value })
      .then(_ => {
        setValue(DiaryTypeEnum.DEFAULT)
        setShow(false)
      })
      .then(() => refetchCallback())
  }

  const handleCancel = () => {
    setShow(false)
  }
  const handleChangeTemplate = (e: DiaryTypeEnum) => {
    setValue(e)
  }

  return (
    <>
      <Button
        type={'primary'}
        icon={!breakPoint.sm && <PlusOutlined />}
        onClick={showModal}
      >
        {breakPoint.sm ? 'Создать дневник' : ''}
      </Button>
      <Modal
        title='Создание дневника практики'
        open={show}
        onCancel={handleCancel}
        footer={[
          <Button
            type='primary'
            onClick={handleOk}
          >
            Создать
          </Button>,
        ]}
      >
        <Select
          placeholder={'Выберите тип работы'}
          onChange={handleChangeTemplate}
          options={templates}
        />
      </Modal>
    </>
  )
}
