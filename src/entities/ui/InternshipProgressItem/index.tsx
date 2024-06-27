import { Table, TableProps } from 'antd'
import { GetStudentInternshipProgressResponse } from '../../../shared/api/Internship/InternshipDataSource.ts'
import { CommentsModal, StatusModal, DeleteInternshipProgressModal } from '../../../Features'
import { useLeaveCommentUserMutation, MessageCredential } from '../../../shared'

interface InternshipProgressItemProps {
  dataSource: GetStudentInternshipProgressResponse | []
  acceptedCompany?: string
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

export const InternshipProgressItem = ({
  dataSource,
  refetchCallback,
  acceptedCompany,
}: InternshipProgressItemProps) => {
  const [trigger] = useLeaveCommentUserMutation()

  const handleSendMessage = ({ text, senderId }: MessageCredential) => {
    trigger({ companyId: senderId, text: text }).then(response => {
      if (!response.error) {
        refetchCallback()
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
          refetchCallback={refetchCallback}
          sendMessageCallback={handleSendMessage}
          id={record.companyId}
          comments={record.comments}
          title={`Комментарии ${record.comments.length > 0 ? record.comments.length : ''}`}
        />
      ),
    },
    {
      title: 'Статус',
      dataIndex: 'progressStatus',
      key: 'progressStatus',
      render: (_, record) => {
        return (
          <>
            {(!acceptedCompany || record.companyId === acceptedCompany) && (
              <StatusModal
                refetchCallback={refetchCallback}
                companyId={record.companyId}
                progressStatus={record.progressStatus}
              />
            )}
          </>
        )
      },
    },
    {
      title: 'Удаление',
      dataIndex: 'actionDelete',
      key: 'actionDelete',
      render: (_, record) => {
        return (
          <>
            {acceptedCompany !== record.companyId && (
              <DeleteInternshipProgressModal
                refetchCallback={refetchCallback}
                companyId={record.companyId}
              />
            )}
          </>
        )
      },
    },
  ]

  return (
    <Table
      style={{ width: '100%' }}
      scroll={{ x: 300 }}
      dataSource={createDataSource(dataSource)}
      columns={columns}
      pagination={false}
    />
  )
}
