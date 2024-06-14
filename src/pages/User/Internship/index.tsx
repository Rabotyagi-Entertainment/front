import { Layout, List, Typography } from 'antd'
import { useGetStudentInternshipsQuery } from '../../../shared/api/Internship/InternshipRequest.ts'
import { InternshipItem } from '../../../entities/ui/IntershipItem'

const { Title } = Typography

export const InternshipStudent = () => {
  const { data } = useGetStudentInternshipsQuery({})
  return (
    <>
      <Layout>
        <Title>{'Стажировка'}</Title>
        <List>
          <InternshipItem companies={data! ? data : []} />
        </List>
      </Layout>
    </>
  )
}
