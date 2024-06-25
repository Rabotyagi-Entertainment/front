import { NavLink, useParams } from 'react-router-dom'
import { Empty, Layout, Spin, Table, TableProps, Tag, Typography } from 'antd'
import { useGetStudentsAdminInternshipsProgressQuery } from '../../../shared/api/internshipAdmin/InternshipAdminRequest.ts'
import { GetAdminStudentInternshipProgressResponse } from '../../../shared/api/internshipAdmin/InternshipAdminDataSource.ts'
import { RouteType } from '../../../app/routes/RouteType.ts'

const { Title } = Typography

const createDataSource = (dataSource: GetAdminStudentInternshipProgressResponse) => {
  return dataSource!.map(item => {
    return {
      key: item.id,
      internshipId: item.id,
      company: item.company.name,
      practiceDiaries: item.practiceDiaries,
      endedAt: item.endedAt ? item.endedAt : 'По настоящее время',
      startedAt: item.startedAt.split('T')[0],
    }
  })
}

const columns: TableProps['columns'] = [
  {
    title: 'Компания',
    dataIndex: 'company',
    key: 'company',
  },
  {
    title: 'Начало',
    dataIndex: 'startedAt',
    key: 'startedAt',
  },
  {
    title: 'Конец',
    dataIndex: 'endedAt',
    key: 'endedAt',
  },
  {
    title: 'Дневники',
    dataIndex: 'practiceDiaries',
    key: 'practiceDiaries',
    render: (_, record) => {
      if (record.practiceDiaries && record.practiceDiaries.length > 0) {
        return <NavLink to={`${RouteType.ADMIN_DIARY}/${record.key}`}>{'Дневники'}</NavLink>
      } else {
        return <Tag color={'red'}>Дневников пока нет</Tag>
      }
    },
  },
]

const InternshipAdmin = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetStudentsAdminInternshipsProgressQuery({ studentId: id! })

  if (isLoading) {
    return <Spin />
  }

  return (
    <Layout>
      <Title>{'Администрирование стажировок'}</Title>
      {data ? (
        <Table
          columns={columns}
          dataSource={createDataSource(data!)}
        />
      ) : (
        <Empty description={'Нет стажировок'} />
      )}
    </Layout>
  )
}

export default InternshipAdmin
