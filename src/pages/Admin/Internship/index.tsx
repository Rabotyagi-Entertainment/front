import { NavLink, useParams } from 'react-router-dom'
import { Layout, List, Spin, Typography } from 'antd'
import { useGetStudentsInternshipsQuery } from '../../../shared/api/internshipAdmin/InternshipAdminRequest.ts'

const { Title, Text } = Typography
const InternshipAdmin = () => {
  const { id } = useParams()
  const { data, isLoading } = useGetStudentsInternshipsQuery({ studentId: id! })

  if (isLoading) {
    return <Spin />
  }

  return (
    <Layout>
      <Title>{'Администрирование собеседований'}</Title>
      <List bordered>
        {data! &&
          data.map(item => {
            return (
              <>
                <List.Item key={item.id}>
                  <Title>{item.company.name}</Title>
                  <Text>{item.startedAt}</Text>
                  <Text>{item.endedAt}</Text>
                  {item.practiceDiaries.length > 0 && <NavLink to={`/admin/diary/${item.id}`}>{'Дневники'}</NavLink>}
                </List.Item>
              </>
            )
          })}
      </List>
    </Layout>
  )
}

export default InternshipAdmin
