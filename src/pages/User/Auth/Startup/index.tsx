import { Button, Form, Input, InputNumber, Layout, Select, Space, Typography } from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'
import { useGetCompaniesQuery } from '../../../../shared/api/internshipAdmin/InternshipAdminRequest.ts'
import { GetCompaniesResponse } from '../../../../shared/api/internshipAdmin/InternshipAdminDataSource.ts'
import { useAddCompanyMutation, useRemoveCompanyMutation } from '../../../../shared/api/Internship/InternshipRequest.ts'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'antd/es/form/Form'

const { Title } = Typography

const createOptions = (data: GetCompaniesResponse) => {
  return data.map((item: any) => ({
    label: item.name,
    value: item.id,
  }))
}

export const Startup = () => {
  const [form] = useForm()
  const { data } = useGetCompaniesQuery({})
  const [trigger] = useAddCompanyMutation()
  const [triggerRemove] = useRemoveCompanyMutation()
  const navigate = useNavigate()

  const onAddCompany = () => {
    const length = form.getFieldsValue().companies.length - 2
    if (length >= 0) {
      const { companyId, priority, additionalInfo } = form.getFieldsValue().companies[length]
      trigger({
        companyId: companyId,
        payload: { status: 'Default', additionalInfo: additionalInfo, priority: priority },
      })
    }
  }

  const onDeleteCompany = (name: number) => {
    const { companyId } = form.getFieldsValue().companies[name]
    triggerRemove({ companyId: companyId })
  }

  const onFinish = () => {
    const len = form.getFieldsValue().companies.length
    const { companyId, priority, additionalInfo } = form.getFieldsValue().companies[len - 1]
    trigger({
      companyId: companyId,
      payload: { status: 'Default', additionalInfo: additionalInfo, priority: priority },
    }).then(response => {
      if (!response.error) {
        navigate('/student/internship/progress')
      }
    })
  }

  return (
    <Layout style={{ padding: '1rem' }}>
      <Title>Начало</Title>
      <Form
        form={form}
        style={{ display: 'flex', flexDirection: 'column' }}
        name='dynamic_form_internship_startup'
        initialValues={{ companies: [] }}
      >
        <Form.List name='companies'>
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key}>
                  <Form.Item
                    {...restField}
                    name={[name, 'companyId']}
                    rules={[{ required: true, message: 'Выберите компанию или удалите поле' }]}
                  >
                    <Select
                      placeholder={'Компания-партнер'}
                      onChange={e => {
                        key = e.id
                      }}
                      options={data! ? createOptions(data!) : []}
                    />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'priority']}
                    label={'Приоритет'}
                    rules={[{ required: true, message: 'Введите приоритет' }]}
                  >
                    <InputNumber placeholder={'0'} />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, 'additionalInfo']}
                  >
                    <Input placeholder={'Комментарий'} />
                  </Form.Item>
                  <MinusCircleOutlined
                    onClick={() => {
                      onDeleteCompany(name)
                      remove(name)
                    }}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type='dashed'
                  disabled={fields.length < 1}
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
          >
            Подтвердить
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  )
}
