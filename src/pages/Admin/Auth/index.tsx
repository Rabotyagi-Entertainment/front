import { Button, Form, FormProps, Input, Layout, Typography } from 'antd'
import { useLoginMutation } from '../../../shared/api/Auth/AuthRequest.ts'
import { LoginPayload } from '../../../shared/api/Auth/AuthDataSource.ts'

type FieldType = LoginPayload

const { Title } = Typography
const AdminAuth = () => {
  const [authTrigger] = useLoginMutation()

  const onFinish = (values: FieldType) => {
    authTrigger(values)
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    alert(`Ошибка: ${errorInfo}`)
  }

  return (
    <>
      <Layout>
        <Title>{'Админ панель'}</Title>
        <Form
          name='basic'
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item<FieldType>
            label='Логин'
            name='telegramUserName'
            rules={[{ required: true, message: 'Введите логин!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label='Пароль'
            name='password'
            rules={[{ required: true, message: 'Введите пароль!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button
              type='primary'
              htmlType='submit'
            >
              Войти
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    </>
  )
}

export default AdminAuth
