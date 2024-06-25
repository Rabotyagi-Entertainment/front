import { Layout, Typography } from 'antd'
import { useGetStudentInternshipsQuery } from '../../../shared'
import { InternshipItem } from '../../../entities'

const { Title } = Typography

export const InternshipStudent = () => {
  const { data } = useGetStudentInternshipsQuery({})
  return (
    <Layout>
      <Title>{'Стажировка'}</Title>
      <InternshipItem companies={data! ? data : []} />
    </Layout>
  )
}
