import { useParams } from 'react-router-dom'
import {
  useCommentMutation,
  useLazyGetStudentsAdminInternshipsQuery,
} from '../../../shared/api/internshipAdmin/InternshipAdminRequest.ts'
import { Spin, Table, TableProps, Tag, Typography } from 'antd'
import { statusInternshipProgressMapper } from '../../../shared/library/utils/utils.ts'
import { GetAdminStudentInternshipResponse } from '../../../shared/api/internshipAdmin/InternshipAdminDataSource.ts'
import { CommentsModal } from '../../../Features'
import { InternshipProgressEnum, MessageCredential } from '../../../shared'
import { useEffect } from 'react'

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

  const [trigger, { data, isLoading }] = useLazyGetStudentsAdminInternshipsQuery()
  const [mutationTrigger] = useCommentMutation()
  useEffect(() => {
    trigger({ studentId: id! })
  }, [id])

  const handleSendMessage = ({ text, senderId }: MessageCredential) => {
    mutationTrigger({ internshipProgressId: senderId, text: text }).then(response => {
      if (response.error) {
      } else {
        trigger({ studentId: id! })
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
          refetchCallback={() => trigger({ studentId: id! })}
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
      {!isLoading && data && (
        <Table
          dataSource={createDataSource(data!)}
          columns={columns}
        />
      )}
    </>
  )
}
