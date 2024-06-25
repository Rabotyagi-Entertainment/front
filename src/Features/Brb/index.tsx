import { Button, DatePicker, Form, Input, InputNumber, Modal } from 'antd'
import { BellOutlined, MehOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { useSendDeadlineMessageMutation } from '../../shared/api/Auth/AuthRequest.ts'
import { useForm } from 'antd/es/form/Form'
import { SendMessageDeadlinePayload } from '../../shared/api/Auth/AuthDataSource.ts'

type FieldType = SendMessageDeadlinePayload

export const BrbModal = () => {
  const [show, setShow] = useState<boolean>()
  const [trigger] = useSendDeadlineMessageMutation()
  const [form] = useForm()

  const onFinish = () => {
    trigger(form.getFieldsValue()).then(response => {
      alert(response)
    })
  }

  const showModal = () => {
    setShow(true)
  }

  const handleCancel = () => {
    setShow(false)
  }

  return (
    <>
      <Button
        style={{ backgroundColor: 'red' }}
        type={'primary'}
        icon={<BellOutlined />}
        onClick={showModal}
      >
        {'Уведомления'}
      </Button>
      <Modal
        title='Создать уведомление'
        open={show}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name='sendDeadlineForm'
          form={form}
          initialValues={{ courseNumber: '', optionalMessage: '', deadlineTime: '' }}
          onFinish={onFinish}
        >
          <Form.Item<FieldType>
            label='Сообщение'
            name='optionalMessage'
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label='№ Курса'
            name='courseNumber'
          >
            <InputNumber />
          </Form.Item>

          <Form.Item<FieldType>
            label='Дедлайн'
            name='deadlineTime'
          >
            <DatePicker showTime />
          </Form.Item>

          <Form.Item>
            <Button
              icon={<MehOutlined />}
              style={{ backgroundColor: 'red' }}
              type='primary'
              htmlType='submit'
              block
            >
              {'ОТПРАВИТЬ'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
