import { Button, Empty, Form, Input, Layout, List, Space, Spin } from 'antd'
import { useLazyGetStudentsParametersQuery } from '../../../shared/api/internshipAdmin/InternshipAdminRequest.ts'
import { SearchOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { StudentItem } from '../../../entities/ui/StudentItem'

const Lists = () => {
  const [search, setSearch] = useState<string>('')
  const [company, setCompany] = useState<string>('')
  const [group, setGroup] = useState<string>('')
  const [trigger, { data, isFetching }] = useLazyGetStudentsParametersQuery()

  useEffect(() => {
    trigger({ search: search, company: company, group: group })
  }, [])

  const handleSearch = () => {
    trigger({ search: search, company: company, group: group })
  }

  if (isFetching) {
    return <Spin />
  }

  return (
    <>
      <Layout>
        <Space>
          <Form
            layout={'vertical'}
            style={{ display: 'flex', gap: '1rem', alignItems: 'end', flexWrap: 'wrap' }}
          >
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
            <Form.Item>
              <Button
                onClick={handleSearch}
                type={'primary'}
                htmlType={'submit'}
                icon={<SearchOutlined />}
              >
                {'Поиск'}
              </Button>
            </Form.Item>
          </Form>
        </Space>
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
