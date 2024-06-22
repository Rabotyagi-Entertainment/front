import { Empty, Flex, Form, Input, Layout, List, Space } from 'antd'
import { useLazyGetStudentsParametersQuery } from '../../../shared/api/internshipAdmin/InternshipAdminRequest.ts'
import { useEffect } from 'react'
import { StudentItem } from '../../../entities/ui/StudentItem'
import { ExportCurrentInternship } from '../../../Features/diary/exportCurrentInternship'
import { useForm } from 'antd/es/form/Form'
import { baseUrl } from '../../../shared/api/static/authConfig.ts'
import { UploadingModal } from '../../../Features/userUploading'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'

const Lists = () => {
  const [form] = useForm()
  const breakPoint = useBreakpoint()
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
            style={{ display: 'flex', gap: `${breakPoint.sm ? '1rem' : 0}`, alignItems: 'end', flexWrap: 'wrap' }}
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
          <Flex
            gap={'1rem'}
            wrap
            style={{ marginBottom: '1rem' }}
          >
            <UploadingModal
              title={'Загрузить список студентов'}
              url={baseUrl + 'api/auth/students/table'}
            />
            <ExportCurrentInternship />
          </Flex>
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
