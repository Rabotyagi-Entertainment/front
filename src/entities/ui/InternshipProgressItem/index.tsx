import { Table, TableProps } from 'antd'
import { GetStudentInternshipProgressResponse } from '../../../shared/api/Internship/InternshipDataSource.ts'
import { CommentsModal } from '../../../Features/internshipProgress/Comments'
import { StatusModal } from '../../../Features/internshipProgress/StatusEdit'
import { useCommentMutation } from '../../../shared/api/internshipAdmin/InternshipAdminRequest.ts'

type SendMessageType = { value: string; id: string }

interface InternshipProgressItemProps {
  dataSource: GetStudentInternshipProgressResponse | []
  refetchCallback: () => void
}

const createDataSource = (dataSource: GetStudentInternshipProgressResponse) => {
  return dataSource!.map(item => {
    return {
      key: item.id,
      company: item.company.name,
      companyId: item.company.id,
      priority: item.priority,
      createdAt: item.createdAt.split('T')[0],
      progressStatus: item.progressStatus,
      comments: item.comments,
    }
  })
}

export const InternshipProgressItem = ({ dataSource, refetchCallback }: InternshipProgressItemProps) => {
  const [trigger] = useCommentMutation()

  const handleSendMessage = ({ value, id }: SendMessageType) => {
    trigger({ internshipProgressId: id, text: value })
    refetchCallback()
  }
  const columns: TableProps['columns'] = [
    {
      title: 'Компания',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: 'Приоритет',
      dataIndex: 'priority',
      key: 'priority',
    },
    {
      title: 'Дата создания',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Комментарии',
      dataIndex: 'comments',
      key: 'comments',
      render: (_, record) => (
        <CommentsModal
          sendMessageCallback={handleSendMessage}
          id={record.companyId}
          comments={record.comments}
          title={record.comments.length > 0 ? record.comments.length : 'Комментарии'}
        />
      ),
    },
    {
      title: 'Статус',
      dataIndex: 'progressStatus',
      key: 'progressStatus',
      render: (_, record) => {
        return (
          <StatusModal
            refetchCallback={refetchCallback}
            companyId={record.companyId}
            progressStatus={record.progressStatus}
          />
        )
      },
    },
  ]

  return (
    <Table
      dataSource={createDataSource(dataSource)}
      columns={columns}
    />
  )
}
