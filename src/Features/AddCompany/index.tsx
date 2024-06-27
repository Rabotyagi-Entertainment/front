import { Button, Flex, Form, Input, Modal, notification } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { useCreateCompanyMutation } from '../../shared/api/internshipAdmin/InternshipAdminRequest.ts'
import { NotificationType } from '../../shared'
import { useState } from 'react'

export const AddCompany = () => {
  const breakPoint = useBreakpoint()
  const [form] = useForm()
  const [trigger] = useCreateCompanyMutation()
  const [show, setShow] = useState<boolean>(false)

  const [api, contextHolder] = notification.useNotification()

  const openNotification = ({ type, message, content }: NotificationType) => {
    api.open({
      message: message,
      description: content,
      placement: 'topRight',
      type: type,
      icon:
        type === 'error' ? (
          <CloseCircleOutlined style={{ color: 'red' }} />
        ) : (
          <CheckCircleOutlined style={{ color: 'green' }} />
        ),
    })
  }

  const onAddCompany = () => {
    const length = form.getFieldsValue().companies.length - 2
    if (form.getFieldsValue().companies) {
      if (length >= 0) {
        const { name } = form.getFieldsValue().companies[length]
        trigger({ name: name }).then(response => {
          if (response.error) {
            openNotification({
              type: 'error',
              // @ts-ignore
              message: `Ошибка - ${response.error.status}`,
              // @ts-ignore
              content: response.error.data.Message,
            })
          } else {
            openNotification({ type: 'success', message: 'Компания успешно добавлена', content: '' })
          }
        })
      }
    }
  }

  const onFinish = () => {
    const len = form.getFieldsValue().companies.length
    const { name } = form.getFieldsValue().companies[len - 1]
    trigger({ name: name }).then(response => {
      if (response.error) {
        openNotification({
          type: 'error',
          // @ts-ignore
          message: `Ошибка - ${response.error.status}`,
          // @ts-ignore
          content: response.error.data.Message,
        })
      } else {
        openNotification({ type: 'success', message: 'Компания успешно добавлена', content: '' })
      }
    })
  }
  const showModal = () => {
    setShow(true)
  }
  const handleClose = () => {
    setShow(false)
  }

  return (
    <>
      <Button
        type={'primary'}
        onClick={showModal}
      >
        <PlusOutlined />
      </Button>
      <Modal
        title={'Добавление компании'}
        open={show}
        onOk={handleClose}
        onCancel={handleClose}
        footer={null}
      >
        <Form
          form={form}
          layout={'vertical'}
          style={{ display: 'flex', flexDirection: 'column' }}
          name='dynamic_form_create_companies'
          initialValues={{ companies: [] }}
        >
          {contextHolder}
          <Form.List name='companies'>
            {(fields, { add }) => (
              <>
                {fields.map(({ key, name, ...restField }) => (
                  <Flex
                    key={key}
                    gap={'1rem'}
                    vertical={breakPoint.xs}
                    align={breakPoint.xs ? 'start' : 'center'}
                    style={{
                      padding: '1rem 0.5rem',
                      backgroundColor: 'white',
                      borderRadius: '0.5rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      label={'Название'}
                      rules={[{ required: true, message: 'Введите название' }]}
                    >
                      <Input />
                    </Form.Item>
                  </Flex>
                ))}
                <Form.Item>
                  <Button
                    style={{ marginTop: '1rem' }}
                    type='dashed'
                    onClick={() => {
                      add()
                      onAddCompany()
                    }}
                    block
                    icon={<PlusOutlined />}
                  >
                    Добавить компанию
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
          <Form.Item>
            <Button
              type='primary'
              onClick={onFinish}
              block
            >
              Добавить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
