import {
  Button,
  Empty,
  Flex,
  Input,
  InputRef,
  Layout,
  Space,
  Table,
  TableColumnType,
  TableProps,
  Tag,
  Tooltip,
} from 'antd'
import { useLazyGetStudentsParametersQuery } from '../../../shared/api/internshipAdmin/InternshipAdminRequest.ts'
import { useEffect, useRef } from 'react'
import { useForm } from 'antd/es/form/Form'
import { NavLink } from 'react-router-dom'
import { CodeOutlined, ExportOutlined, SearchOutlined } from '@ant-design/icons'
import { RouteType } from '../../../app/routes/RouteType.ts'
import { GetStudentsListSearchableResponse } from '../../../shared/api/internshipAdmin/InternshipAdminDataSource.ts'
import { CurrentCompanyType, InternshipCompanyType } from '../../../shared'
import { statusInternshipProgressMapper } from '../../../shared/library/utils/utils.ts'

type DataType = {
  userId: string
  search: string
  group: string
  company: InternshipCompanyType[]
  currentCompany: CurrentCompanyType | null
}

type DataIndex = keyof DataType

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
  const [trigger, { data, isLoading }] = useLazyGetStudentsParametersQuery()
  const inputRef = useRef<InputRef>(null)

  useEffect(() => {
    trigger(form.getFieldsValue())
  }, [])

  const handleSearch = ({ key, value }: { value: string[]; key: string }) => {
    // @ts-ignore
    trigger({ [key]: value[0].toLowerCase() })
  }

  const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, close }) => (
      <div
        style={{ padding: 8 }}
        onKeyDown={e => e.stopPropagation()}
      >
        <Input
          ref={inputRef}
          placeholder={`Поиск ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch({ value: selectedKeys as string[], key: dataIndex })}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch({ value: selectedKeys as string[], key: dataIndex })}
            icon={<SearchOutlined />}
            size='small'
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              close()
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
  })

  const columns: TableProps<DataType>['columns'] = [
    {
      title: 'ФИО',
      dataIndex: 'search',
      key: 'search',
      ...getColumnSearchProps('search'),
    },
    {
      title: 'Группа',
      dataIndex: 'group',
      key: 'group',
      ...getColumnSearchProps('group'),
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
      ...getColumnSearchProps('company'),
      render: (_, record) => {
        return (
          <Space wrap>
            {record.company.length > 0 ? (
              record.company.map(item => {
                return (
                  <Tooltip
                    color={statusInternshipProgressMapper[item.status].color}
                    title={statusInternshipProgressMapper[item.status].text}
                  >
                    <Tag
                      style={{ cursor: 'pointer' }}
                      color={'green'}
                    >
                      {item.name}
                    </Tag>
                  </Tooltip>
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
      </Layout>
    </>
  )
}

export default Lists
