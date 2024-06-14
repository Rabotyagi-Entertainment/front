import { Form, Input, Layout, List, Space } from 'antd'
import { useGetStudentsParametersQuery } from '../../../shared/api/internshipAdmin/InternshipAdminRequest.ts'
import { useState } from 'react'
import { StudentItem } from '../../../entities/ui/StudentItem'

const Lists = () => {
  const [search, setSearch] = useState<string>('')
  const [company, setCompany] = useState<string>('')
  const [group, setGroup] = useState<string>('')

  const { data } = useGetStudentsParametersQuery({ search: search, company: company, group: group })
  return (
    <>
      <Layout>
        <Space>
          <Form>
            <Form.Item
              label='Поиск'
              name='search'
            >
              <Input
                value={search}
                onChange={e => setSearch(e.currentTarget.value)}
              />
            </Form.Item>
            <Form.Item
              label='Компания'
              name='company'
            >
              <Input
                value={company}
                onChange={e => setCompany(e.currentTarget.value)}
              />
            </Form.Item>
            <Form.Item
              label='Группа'
              name='group'
            >
              <Input
                value={group}
                onChange={e => setGroup(e.currentTarget.value)}
              />
            </Form.Item>
          </Form>
        </Space>
        <List>
          {data!.map(item => (
            <List.Item>
              <StudentItem
                item={item}
                key={item.id}
              />
            </List.Item>
          ))}
        </List>
      </Layout>
    </>
  )
}

export default Lists
