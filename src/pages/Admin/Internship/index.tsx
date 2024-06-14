import { useParams } from 'react-router-dom'
import { Layout, Typography } from 'antd'

const { Title } = Typography
const InternshipAdmin = () => {
  const { id } = useParams()
  return (
    <Layout>
      <Title>{'InternshipAdmin'}</Title>
    </Layout>
  )
}

export default InternshipAdmin
