import { useParams } from 'react-router-dom'
import { useGetStudentsStatusesQuery } from '../../../shared/api/internshipAdmin/InternshipAdminRequest.ts'
import { Layout } from 'antd'
import { InternshipItem } from '../../../entities/ui/IntershipItem'

const Student = () => {
  const { id } = useParams<{ id: string }>()
  const { data } = useGetStudentsStatusesQuery({ userId: id! })
  return (
    <Layout>
      {data!.map(item => {
        return <InternshipItem item={item} />
      })}
    </Layout>
  )
}

export default Student
