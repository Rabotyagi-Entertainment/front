import { Button, Form, FormProps, Input, Layout, Select, Typography } from 'antd'
import { useGetStudentsQuery, useRegisterMutation } from '../../../shared/api/Auth/AuthRequest.ts'
import { RegisterPayload, GetLoadedStudentsResponse } from '../../../shared/api/Auth/AuthDataSource.ts'
import { ReactNode } from 'react'

type FieldType = RegisterPayload

const createOptions = (data: GetLoadedStudentsResponse): { value: string; label: ReactNode }[] => {
  return data.map(({ fullName, group, telegramUserName }) => ({
    value: telegramUserName,
    label: `${fullName} - ${group}`,
  }))
}

const { Title } = Typography
const Auth = () => {
  const [authTrigger] = useRegisterMutation()
  const { data } = useGetStudentsQuery({})

  const onFinish = (values: FieldType) => {
    authTrigger(values)
  }

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = errorInfo => {
    alert(`Ошибка: ${errorInfo}`)
  }

  return (
    <>
      <Layout>
        <Title>{'Регистрация'}</Title>
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
            <Select
              placeholder={'Выберите себя из списка'}
              options={createOptions(data!)}
            />
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
              Зарегистрироваться
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    </>
  )
}

export default Auth
