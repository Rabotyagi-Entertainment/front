import { Table, TableProps } from 'antd'
import { GetStudentInternshipResponse } from '../../../shared/api/Internship/InternshipDataSource.ts'
import { NavLink } from 'react-router-dom'

interface InternshipItemProps {
  companies: GetStudentInternshipResponse
}

const createDataSource = (dataSource: GetStudentInternshipResponse) => {
  return dataSource!.map(item => {
    return {
      key: item.id,
      internshipId: item.id,
      company: item.company.name,
      companyId: item.company.id,
      startedAt: item.startedAt.split('T')[0],
      endedAt: item.endedAt ? item.endedAt.split('T')[0] : 'По настоящее время',
    }
  })
}

export const InternshipItem = ({ companies }: InternshipItemProps) => {
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
      dataIndex: 'diaries',
      key: 'diaries',
      render: (_, record) => {
        return <NavLink to={`/student/diary/${record.internshipId}`}>{'Дневники'}</NavLink>
      },
    },
  ]

  return (
    <Table
      scroll={{ x: 300 }}
      dataSource={createDataSource(companies!)}
      columns={columns}
    />
  )
}
