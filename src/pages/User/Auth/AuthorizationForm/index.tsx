import { Button, Flex, Form, FormProps, Input, Select, Spin, Typography } from 'antd'
import { useGetStudentsQuery, useRegisterMutation } from '../../../../shared/api/Auth/AuthRequest.ts'
import { GetLoadedStudentsResponse, RegisterPayload } from '../../../../shared/api/Auth/AuthDataSource.ts'
import { NavLink } from 'react-router-dom'
import { RouteType } from '../../../../app/routes/RouteType.ts'

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

  const onFinish = (values: FieldType) => {
    authTrigger({ ...values }).then(response => {
      if (response.error) {
        alert(`Ошибка: ${response.error}`)
      } else {
        localStorage.setItem('userToken', response.data.jwt)
        successCallback()
      }
    })
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    alert(`Ошибка: ${errorInfo}`)
  }

  if (isFetching) {
    return <Spin size={'large'} />
  }

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
  return (
    <>
      <Title style={{ textAlign: 'center' }}>{'Регистрация'}</Title>
      <Form
        layout={'vertical'}
        style={{ minWidth: 300, width: '100%' }}
        name='register'
        initialValues={{ password: '', fullName: '', email: '', telegramUserName: '' }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
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
