import { Button, Form, FormProps, Input, Select, Spin } from 'antd'
import { useGetStudentsQuery, useRegisterMutation } from '../../../../shared/api/Auth/AuthRequest.ts'
import { GetLoadedStudentsResponse, RegisterPayload } from '../../../../shared/api/Auth/AuthDataSource.ts'

type FieldType = Omit<RegisterPayload, 'telegramUserName'>

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
  const [authTrigger] = useRegisterMutation()
  const { data, isFetching } = useGetStudentsQuery({})

  const onFinish = (values: FieldType) => {
    authTrigger({ telegramUserName: 'username', ...values }).then(response => {
      if (response.error) {
        alert(`Ошибка: ${response.error}`)
      } else {
        localStorage.setItem('userToken', response.data.token)
        successCallback()
      }
    })
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    alert(`Ошибка: ${errorInfo}`)
  }

  if (isFetching) {
    return (
      <div style={{ inset: 0, position: 'absolute', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Spin size={'large'} />
      </div>
    )
  }

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
  return (
    <>
      <Form
        name='register'
        initialValues={{ password: '', fullName: '', email: '' }}
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
          label='Пароль'
          name='password'
          rules={[{ required: true, message: 'Введите пароль!' }]}
        >
          <Input.Password autoComplete={'off'} />
        </Form.Item>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
          >
            Зарегистрироваться
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
