import { Button, DatePicker, Form, Input, InputNumber, Modal, notification } from 'antd'
import { BellOutlined, CloseCircleOutlined, MehOutlined } from '@ant-design/icons'
import { useState } from 'react'
import { NotificationType, useSendDeadlineMessageMutation } from '../../shared'
import { useForm } from 'antd/es/form/Form'
import { SendMessageDeadlinePayload } from '../../shared/api/Auth/AuthDataSource.ts'

type FieldType = SendMessageDeadlinePayload

export const BrbModal = () => {
  const [show, setShow] = useState<boolean>()
  const [trigger] = useSendDeadlineMessageMutation()
  const [form] = useForm()

  const [api, contextHolder] = notification.useNotification()

  const openNotification = ({ type, message, content }: NotificationType) => {
    api.open({
      message: message,
      description: content,
      placement: 'topRight',
      type: type,
      icon: <CloseCircleOutlined style={{ color: 'red' }} />,
    })
  }

  const onFinish = () => {
    trigger(form.getFieldsValue()).then(response => {
      if (response.error) {
        openNotification({
          type: 'error',
          // @ts-ignore
          message: `Ошибка - ${response.error.status}`,
          // @ts-ignore
          content: response.error.data.Message,
        })
      }
      setShow(false)
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
      {contextHolder}
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
