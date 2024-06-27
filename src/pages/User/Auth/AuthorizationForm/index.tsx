import { Button, Flex, Form, Input, notification, Select, Spin, Typography } from 'antd'
import { NotificationType, useGetStudentsQuery, useRegisterMutation } from '../../../../shared'
import { GetLoadedStudentsResponse, RegisterPayload } from '../../../../shared/api/Auth/AuthDataSource.ts'
import { NavLink } from 'react-router-dom'
import { RouteType } from '../../../../app/routes/RouteType.ts'
import { CloseCircleOutlined } from '@ant-design/icons'

type FieldType = RegisterPayload

const { Title } = Typography

interface AuthorizationFormProps {
  successCallback: () => void
}

const createOptions = (data: GetLoadedStudentsResponse): { value: string; label: string }[] => {
  return data.map(item => {
    return {
      value: item.fullName ? item.fullName : item.id,
      label: `${item.fullName} - ${item.group}`,
    }
  })
}

export const AuthorizationForm = ({ successCallback }: AuthorizationFormProps) => {
  const [authTrigger, { isLoading }] = useRegisterMutation()
  const { data, isFetching } = useGetStudentsQuery({})

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

  const onFinish = (values: FieldType) => {
    authTrigger({ ...values }).then(response => {
      if (response.error) {
        openNotification({
          type: 'error',
          // @ts-ignore
          message: `Ошибка - ${response.error.status}`,
          // @ts-ignore
          content: response.error.data.Message,
        })
      } else {
        localStorage.setItem('userToken', response.data.jwt)
        successCallback()
      }
    })
  }

  if (isFetching) {
    return <Spin size={'large'} />
  }

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
  return (
    <>
      {contextHolder}
      <Title style={{ textAlign: 'center' }}>{'Регистрация'}</Title>
      <Form
        layout={'vertical'}
        style={{ minWidth: 300, width: '100%' }}
        name='register'
        initialValues={{ password: '', fullName: '', email: '', telegramUserName: '' }}
        onFinish={onFinish}
      >
        <Form.Item<FieldType>
          label='Пользователь'
          name='fullName'
          rules={[{ required: true, message: 'Выберите себя!' }]}
        >
          {data! ? (
            <Select
              showSearch
              filterOption={filterOption}
              placeholder={'Выберите себя из списка'}
              options={createOptions(data!)}
            />
          ) : (
            <Spin />
          )}
        </Form.Item>

        <Form.Item<FieldType>
          label='Email'
          name='email'
          rules={[{ required: true, message: 'Введите почту!', type: 'email' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='Telegram login'
          name='telegramUserName'
          rules={[{ required: true, message: 'Введите tg логин' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='Пароль'
          name='password'
          rules={[{ required: true, message: 'Введите пароль!' }]}
        >
          <Input.Password autoComplete={'off'} />
        </Form.Item>

        <Form.Item>
          <Form.Item>
            <Flex
              gap={'1rem'}
              align={'center'}
              justify={'center'}
            >
              <Button
                loading={isLoading}
                type='primary'
                htmlType='submit'
              >
                Зарегистрироваться
              </Button>
              <NavLink to={RouteType.LOGIN}>{'Войти'}</NavLink>
            </Flex>
          </Form.Item>
        </Form.Item>
      </Form>
    </>
  )
}
