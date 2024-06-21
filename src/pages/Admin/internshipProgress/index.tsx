import { useParams } from 'react-router-dom'
import {
  useCommentMutation,
  useGetStudentsAdminInternshipsQuery,
} from '../../../shared/api/internshipAdmin/InternshipAdminRequest.ts'
import { List, Spin, Table, TableProps, Tag, Typography } from 'antd'
import { statusInternshipProgressMapper } from '../../../shared/library/utils/utils.ts'
import { GetAdminStudentInternshipResponse } from '../../../shared/api/internshipAdmin/InternshipAdminDataSource.ts'
import { CommentsModal } from '../../../Features/internshipProgress/Comments'

const { Title, Text } = Typography

const createDataSource = (dataSource: GetAdminStudentInternshipResponse) => {
  return dataSource!.map(item => {
    return {
      key: item.id,
      internshipId: item.id,
      additionalInfo: item.additionalInfo,
      company: item.company.name,
      companyId: item.company.id,
      startedAt: item.startedAt.split('T')[0],
      endedAt: item.endedAt ? item.endedAt.split('T')[0] : 'По настоящее время',
    }
  })
}

export const InternshipProgressAdmin = () => {
  const { id } = useParams()

  const { data, isLoading } = useGetStudentsAdminInternshipsQuery({ studentId: id! })
  const [trigger] = useCommentMutation()

  const handleSendMessage = ({ value, id }: { value: string; id: string }) => {
    trigger({ internshipProgressId: id, text: value })
  }

  const columns: TableProps['columns'] = [
    {
      title: 'Компания',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Прогресс',
      dataIndex: 'progressStatus',
      key: 'progressStatus',
      render: (_, record) => (
        <Tag color={statusInternshipProgressMapper[record.progressStatus].color}>
          {statusInternshipProgressMapper[record.progressStatus].text}
        </Tag>
      ),
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
      title: 'Комментарии',
      dataIndex: 'comments',
      key: 'comments',
      render: (_, record) => (
        <CommentsModal
          sendMessageCallback={handleSendMessage}
          id={record.id}
          comments={record.comments}
          title={'Комментариии'}
        />
      ),
    },
  ]

  if (isLoading) {
    return <Spin />
  }

  return (
    <>
      <Title>{'Адмистрирование собеседований'}</Title>
      <Table
        dataSource={createDataSource(data!)}
        columns={columns}
      />
      <List>
        {data!.map(item => {
          return (
            <List.Item>
              <Text>{`Компания: ${item.company.name}`}</Text>
              <Text>{item.additionalInfo}</Text>

              <Tag color={statusInternshipProgressMapper[item.progressStatus].color}>
                {statusInternshipProgressMapper[item.progressStatus].text}
              </Tag>
            </List.Item>
          )
        })}
      </List>
    </>
  )
}
