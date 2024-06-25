import { Button, Flex, Form, Input, Layout, notification, Typography } from 'antd'
import { LoginPayload } from '../../../shared/api/Auth/AuthDataSource.ts'
import { NavLink, useNavigate } from 'react-router-dom'
import { RouteType } from '../../../app/routes/RouteType.ts'
import { jwtDecode } from 'jwt-decode'
import { RolesEnum, useLoginMutation, NotificationType } from '../../../shared'
import { CloseCircleOutlined, CheckCircleOutlined, InfoOutlined } from '@ant-design/icons'

type FieldType = LoginPayload

const { Title } = Typography
const AdminAuth = () => {
  const [authTrigger, result] = useLoginMutation()
  const navigate = useNavigate()

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
        ) : type === 'success' ? (
          <CheckCircleOutlined />
        ) : (
          <InfoOutlined />
        ),
    })
  }

  const onFinish = (values: FieldType) => {
    authTrigger(values).then(response => {
      if (response.error) {
        openNotification({
          type: 'error',
          // @ts-ignore
          message: `Ошибка - ${response.error.status}`,
          // @ts-ignore
          content: response.error.data.Message,
        })
      } else {
        const token = response!.data.jwt
        const role: { 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': RolesEnum } = jwtDecode(token)
        localStorage.setItem('userToken', token)
        navigate(
          role['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === RolesEnum.ADMIN
            ? RouteType.ADMIN_LISTS
            : RouteType.STUDENT_INTERNSHIP
        )
      }
    })
  }

  return (
    <Layout
      style={{ padding: '1rem', height: '100%', margin: '0 auto', backgroundColor: 'white', borderRadius: '1rem' }}
    >
      {contextHolder}
      <Title style={{ textAlign: 'center' }}>{'Авторизация'}</Title>
      <Flex
        vertical
        justify={'center'}
      >
        <Form
          layout={'vertical'}
          style={{ minWidth: '300px' }}
          name='loginForm'
          initialValues={{ telegramUserName: '', password: '' }}
          onFinish={onFinish}
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
