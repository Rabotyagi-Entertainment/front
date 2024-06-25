import { useState } from 'react'
import { Button, Form, Input, InputNumber, Modal, Select } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useForm } from 'antd/es/form/Form'
import { useLazyGetCompaniesQuery } from '../../../shared/api/internshipAdmin/InternshipAdminRequest.ts'
import { GetCompaniesResponse } from '../../../shared/api/internshipAdmin/InternshipAdminDataSource.ts'
import { InternshipProgressEnum, InternshipCompanyType, useAddCompanyMutation } from '../../../shared'

type FormFields = {
  priority: number
  companyId: string
  additionalInfo: string
}
type CreateModalProps = {
  refetchCallback: () => void
  selectedCompanies: InternshipCompanyType[]
}

type CreateOptionsProps = {
  data: GetCompaniesResponse
  selectedCompanies: InternshipCompanyType[]
}

const createOptions = ({ data, selectedCompanies }: CreateOptionsProps) => {
  const filteredCompanies = data.filter(item => {
    return !selectedCompanies.find(i => i.id === item.id && i.status !== InternshipProgressEnum.REJECT)
  })
  return filteredCompanies.map((item: any) => ({
    label: item.name,
    value: item.id,
  }))
}

export const CreateModal = ({ refetchCallback, selectedCompanies }: CreateModalProps) => {
  const [trigger] = useAddCompanyMutation()
  const [mutationTrigger, { data, isLoading }] = useLazyGetCompaniesQuery()
  const [form] = useForm()
  const [show, setShow] = useState<boolean>(false)

  const showModal = () => {
    setShow(true)
    mutationTrigger({})
  }

  const handleOk = () => {
    setShow(false)
  }

  const handleCancel = () => {
    setShow(false)
  }
  const onFinish = ({ companyId, priority, additionalInfo }: FormFields) => {
    trigger({
      companyId: companyId,
      payload: { priority: priority, additionalInfo: additionalInfo, status: 'Default' },
    }).then(response => {
      if (!response.error) {
        refetchCallback()
      }
      setShow(false)
    })
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
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          style={{ display: 'flex', flexDirection: 'column' }}
          name='dynamic_form_internship_startup'
          initialValues={{ companyId: '', priority: 0, additionalInfo: '' }}
          onFinish={onFinish}
        >
          <Form.Item
            name={'companyId'}
            label={'Компания'}
            rules={[{ required: true, message: 'Выберите компанию или удалите поле' }]}
          >
            <Select
              loading={isLoading}
              placeholder={'Компания-партнер'}
              options={data! ? createOptions({ data: data!, selectedCompanies: selectedCompanies }) : []}
            />
          </Form.Item>
          <Form.Item
            name={'priority'}
            label={'Приоритет'}
            rules={[{ required: true, message: 'Введите приоритет' }]}
          >
            <InputNumber placeholder={'0'} />
          </Form.Item>
          <Form.Item
            name={'additionalInfo'}
            label={'Комментарий'}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              type='primary'
              htmlType={'submit'}
            >
              Подтвердить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
