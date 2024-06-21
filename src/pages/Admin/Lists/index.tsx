import { Empty, Flex, Form, Input, Layout, List, Space } from 'antd'
import { useLazyGetStudentsParametersQuery } from '../../../shared/api/internshipAdmin/InternshipAdminRequest.ts'
import { useEffect } from 'react'
import { StudentItem } from '../../../entities/ui/StudentItem'
import { ExportCurrentInternship } from '../../../Features/diary/exportCurrentInternship'
import { UserUploading } from '../../../entities/ui/UserUploading'
import { useForm } from 'antd/es/form/Form'

const Lists = () => {
  const [form] = useForm()
  const [trigger, { data }] = useLazyGetStudentsParametersQuery()

  useEffect(() => {
    trigger(form.getFieldsValue())
  }, [])

  const handleSearch = () => {
    trigger(form.getFieldsValue())
  }

  return (
    <>
      <Layout>
        <Flex vertical>
          <Form
            form={form}
            layout={'vertical'}
            onChange={handleSearch}
            initialValues={{ company: '', search: '', group: '' }}
            style={{ display: 'flex', gap: '1rem', alignItems: 'end', flexWrap: 'wrap' }}
          >
            <Form.Item
              label='Поиск'
              name='search'
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Компания'
              name='company'
            >
              <Input />
            </Form.Item>
            <Form.Item
              label='Группа'
              name='group'
            >
              <Input />
            </Form.Item>
          </Form>
          <Space style={{ marginBottom: '1rem' }}>
            <UserUploading />
            <ExportCurrentInternship />
          </Space>
        </Flex>
        {data! && data.length > 0 ? (
          <List bordered>
            {data!.map(item => (
              <List.Item>
                <StudentItem
                  item={item}
                  key={item.id}
                />
              </List.Item>
            ))}
          </List>
        ) : (
          <Empty description={'Нет студентов'} />
        )}
      </Layout>
    </>
  )
}

export default Lists
