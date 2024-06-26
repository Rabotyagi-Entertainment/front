import { Button, Flex, Form, Input, InputNumber, Layout, Select, Typography } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { useGetCompaniesQuery } from '../../../../shared/api/internshipAdmin/InternshipAdminRequest.ts'
import { GetCompaniesResponse } from '../../../../shared/api/internshipAdmin/InternshipAdminDataSource.ts'
import { useAddCompanyMutation, useRemoveCompanyMutation } from '../../../../shared'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'antd/es/form/Form'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { useState } from 'react'

const { Title } = Typography

const createOptions = (data: GetCompaniesResponse) => {
  return data.map((item: any) => ({
    label: item.name,
    value: item.id,
  }))
}

export const Startup = () => {
  const breakPoint = useBreakpoint()
  const [form] = useForm()
  const { data } = useGetCompaniesQuery({})
  const [trigger] = useAddCompanyMutation()
  const [triggerRemove] = useRemoveCompanyMutation()
  const navigate = useNavigate()
  const [isCanSkip, SetSkip] = useState<boolean>(false)

  const onAddCompany = () => {
    const length = form.getFieldsValue().companies.length - 2
    if (form.getFieldsValue().companies) {
      SetSkip(true)
      if (length >= 0) {
        const { companyId, priority, additionalInfo } = form.getFieldsValue().companies[length]
        trigger({
          companyId: companyId,
          payload: { status: 'Default', additionalInfo: additionalInfo, priority: priority },
        })
      }
    }
  }

  const onDeleteCompany = (name: number) => {
    const companies = form.getFieldsValue().companies
    if (companies.length < 1) {
      SetSkip(false)
    }
    const { companyId } = companies[name]
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
        layout={'vertical'}
        style={{ display: 'flex', flexDirection: 'column' }}
        name='dynamic_form_internship_startup'
        initialValues={{ companies: [] }}
      >
        <Form.List name='companies'>
          {(fields, { add, remove }) => (
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
                    name={[name, 'companyId']}
                    label={'Компания'}
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
                    label={'Комментарий'}
                  >
                    <Input />
                  </Form.Item>
                  <Button
                    danger
                    onClick={() => {
                      onDeleteCompany(name)
                      remove(name)
                    }}
                  >
                    <DeleteOutlined />
                  </Button>
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
            disabled={!isCanSkip}
            block
          >
            Подтвердить
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  )
}
