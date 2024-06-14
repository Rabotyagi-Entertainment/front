import { useState } from 'react'
import { Button, Modal, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { DiaryTypeEnum } from '../../../shared/types/diary/DiaryTypeEnum.ts'
import { useCreatePracticeDiaryMutation } from '../../../shared/api/Diary/DiaryRequest.ts'

interface CreateDiaryModalProps {
  internshipId: string
}
const templates = [
  {
    value: DiaryTypeEnum.DEFAULT,
    label: 'Обычный дневник',
  },
  {
    value: DiaryTypeEnum.COURSE,
    label: 'Курсовая',
  },
  {
    value: DiaryTypeEnum.GRADUATION,
    label: 'Диплом',
  },
]

export const CreateDiaryModal = ({ internshipId }: CreateDiaryModalProps) => {
  const [trigger] = useCreatePracticeDiaryMutation()
  const [value, setValue] = useState<DiaryTypeEnum>(DiaryTypeEnum.DEFAULT)
  const [show, setShow] = useState<boolean>(false)

  const showModal = () => {
    setShow(true)
  }

  const handleOk = () => {
    trigger({ internshipId: internshipId, diaryType: value }).then(_ => {
      setValue(DiaryTypeEnum.DEFAULT)
      setShow(false)
    })
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
        icon={<PlusOutlined />}
        onClick={showModal}
      >
        {'Создать дневник'}
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
