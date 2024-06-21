import { useParams } from 'react-router-dom'
import {
  useCommentMutation,
  useGetStudentsAdminInternshipsQuery,
} from '../../../shared/api/internshipAdmin/InternshipAdminRequest.ts'
import { Spin, Table, TableProps, Tag, Typography } from 'antd'
import { statusInternshipProgressMapper } from '../../../shared/library/utils/utils.ts'
import { GetAdminStudentInternshipResponse } from '../../../shared/api/internshipAdmin/InternshipAdminDataSource.ts'
import { CommentsModal } from '../../../Features/internshipProgress/Comments'
import { InternshipProgressEnum } from '../../../shared/types/internshipProgress/InternshipProgressEnum.ts'

const { Title } = Typography

const createDataSource = (dataSource: GetAdminStudentInternshipResponse) => {
  return dataSource!.map(item => {
    return {
      key: item.id,
      internshipId: item.id,
      additionalInfo: item.additionalInfo,
      comments: item.comments,
      company: item.company.name,
      companyPartner: item.company.isPartner,
      companyId: item.company.id,
      progressStatus: item.progressStatus,
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
      title: 'Дополнительно',
      dataIndex: 'additionalInfo',
      key: 'additionalInfo',
    },
    {
      title: 'Партнер',
      dataIndex: 'companyPartner',
      key: 'companyPartner',
      render: (_, record) => {
        return (
          <Tag color={record.companyPartner ? 'blue' : 'red'}>{record.companyPartner ? 'Партнер' : 'Не партнер'}</Tag>
        )
      },
    },
    {
      title: 'Прогресс',
      dataIndex: 'progressStatus',
      key: 'progressStatus',
      render: (_, record) => (
        <Tag color={statusInternshipProgressMapper[record.progressStatus as InternshipProgressEnum].color}>
          {statusInternshipProgressMapper[record.progressStatus as InternshipProgressEnum].text}
        </Tag>
      ),
    },
    {
      title: 'Комментарии',
      dataIndex: 'comments',
      key: 'comments',
      render: (_, record) => (
        <CommentsModal
          sendMessageCallback={handleSendMessage}
          id={record.key}
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
    </>
  )
}
