import { Button, Flex, Form, FormProps, Input, Layout, Typography } from 'antd'
import { useLoginMutation } from '../../../shared/api/Auth/AuthRequest.ts'
import { LoginPayload } from '../../../shared/api/Auth/AuthDataSource.ts'
import { NavLink, useNavigate } from 'react-router-dom'
import { RouteType } from '../../../app/routes/RouteType.ts'

type FieldType = LoginPayload

const { Title } = Typography
const AdminAuth = () => {
  const [authTrigger, result] = useLoginMutation()
  const navigate = useNavigate()

  const onFinish = (values: FieldType) => {
    authTrigger(values).then(response => {
      if (response.error) {
        alert(`Error: ${response.error}`)
      } else {
        localStorage.setItem('userToken', response!.data.jwt)
        navigate('/admin/lists')
      }
    })
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    alert(`Ошибка: ${errorInfo}`)
  }

  return (
    <Layout
      style={{ padding: '1rem', height: '100%', margin: '0 auto', backgroundColor: 'white', borderRadius: '1rem' }}
    >
      <Title style={{ textAlign: 'center' }}>{'Авторизация'}</Title>
      <Flex
        vertical
        justify={'center'}
      >
        <Form
          layout={'vertical'}
          style={{ minWidth: '300px' }}
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
            <Flex
              gap={'1rem'}
              align={'center'}
              justify={'center'}
            >
              <Button
                loading={result.isLoading}
                type='primary'
                htmlType='submit'
              >
                Войти
              </Button>
              <NavLink to={RouteType.REGISTER}>{'Зарегистрироваться'}</NavLink>
            </Flex>
          </Form.Item>
        </Form>
      </Flex>
    </Layout>
  )
}

export default AdminAuth
