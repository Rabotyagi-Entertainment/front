import { Button, Flex, InputNumber, Modal } from 'antd'
import { FileDoneOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { DownloadButton } from '../DownloadDiary'
import { baseUrl } from '../../../shared'

export const DownloadDiariesCourseList = () => {
  const [show, setShow] = useState<boolean>()
  const [courseNumber, setCourseNumber] = useState<number | null>(null)

  const showModal = () => {
    setShow(true)
  }

  const handleCancel = () => {
    setShow(false)
  }

  return (
    <>
      <Button
        type={'primary'}
        icon={<FileDoneOutlined />}
        onClick={showModal}
      >
        {'Скачать дневники'}
      </Button>
      <Modal
        title='Скачать дневники'
        open={show}
        onCancel={handleCancel}
        footer={null}
      >
        <Flex gap={'1rem'}>
          <InputNumber
            max={6}
            min={3}
            value={courseNumber}
            onChange={e => setCourseNumber(e!)}
          />
          <DownloadButton
            disabled={!courseNumber}
            link={`${baseUrl}diary/students/course?courseNumber=${courseNumber}`}
            iconInner={true}
            title={''}
          />
        </Flex>
      </Modal>
    </>
  )
}
