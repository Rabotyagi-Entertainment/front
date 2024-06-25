import { Button, Empty, Flex, Form, Input, Layout, Popover, Space, Table, TableProps, Tag } from 'antd'
import { useLazyGetStudentsParametersQuery } from '../../../shared/api/internshipAdmin/InternshipAdminRequest.ts'
import { useEffect } from 'react'
import { useForm } from 'antd/es/form/Form'
import { baseUrl } from '../../../shared/api/static/authConfig.ts'
import { UploadingModal } from '../../../Features/userUploading'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { NavLink } from 'react-router-dom'
import { CodeOutlined, ExportOutlined } from '@ant-design/icons'
import { RouteType } from '../../../app/routes/RouteType.ts'
import { GetStudentsListSearchableResponse } from '../../../shared/api/internshipAdmin/InternshipAdminDataSource.ts'
import { CurrentCompanyType, InternshipCompanyType } from '../../../shared/types/Company'

type DataType = {
  userId: string
  search: string
  group: string
  company: InternshipCompanyType[]
  currentCompany: CurrentCompanyType | null
}

const createDataSource = (dataSource: GetStudentsListSearchableResponse): DataType[] => {
  return dataSource!.map(item => {
    return {
      userId: item.id,
      search: item.name,
      group: item.group,
      company: item.companies,
      currentCompany: null,
    }
  })
}

const Lists = () => {
  const [form] = useForm()
  const breakPoint = useBreakpoint()
  const [trigger, { data, isLoading }] = useLazyGetStudentsParametersQuery()

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'ФИО',
      dataIndex: 'search',
      key: 'search',
    },
    {
      title: 'Группа',
      dataIndex: 'group',
      key: 'group',
    },
    {
      title: 'Работает',
      dataIndex: 'currentCompany',
      key: 'currentCompany',
      render: (_, record) => (
        <Tag color={record.currentCompany ? 'green' : 'red'}>
          {record.currentCompany ? record.currentCompany.name : 'Нет'}
        </Tag>
      ),
    },
    {
      title: 'Собеседуется',
      dataIndex: 'company',
      key: 'company',
      render: (_, record) => {
        return (
          <Space wrap>
            {record.company.length > 0 ? (
              record.company.map(item => {
                return (
                  <Popover
                    placement='topLeft'
                    title={'Статус'}
                    content={item.status}
                  >
                    <Tag color={'green'}>{item.name}</Tag>
                  </Popover>
                )
              })
            ) : (
              <Tag color={'red'}>{'Нет'}</Tag>
            )}
          </Space>
        )
      },
    },
    {
      title: 'Стажировки',
      dataIndex: 'internship',
      key: 'internship',
      render: (_, record) => (
        <Flex justify={'center'}>
          <Button>
            <NavLink to={`${RouteType.ADMIN_INTERNSHIP}/${record.userId}`}>
              <CodeOutlined />
            </NavLink>
          </Button>
        </Flex>
      ),
    },
    {
      title: 'Собеседования',
      dataIndex: 'internshipProgress',
      key: 'internshipProgress',
      render: (_, record) => (
        <Flex justify={'center'}>
          <Button>
            <NavLink to={`${RouteType.ADMIN_INTERNSHIP_PROGRESS}/${record.userId}`}>
              <ExportOutlined />
            </NavLink>
          </Button>
        </Flex>
      ),
    },
  ]

  useEffect(() => {
    trigger(form.getFieldsValue())
  }, [])

  // const handleSearch = () => {
  //   trigger(form.getFieldsValue())
  // }

  return (
    <>
      <Layout>
        {data! && data.length > 0 ? (
          <Table
            pagination={false}
            loading={isLoading}
            columns={columns}
            dataSource={createDataSource(data!)}
          />
        ) : (
          <Empty description={'Нет студентов'} />
        )}
        <Flex vertical>
          <Form
            form={form}
            layout={'vertical'}
            // onChange={handleSearch}
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
          </Flex>
        </Flex>
      </Layout>
    </>
  )
}

export default Lists
