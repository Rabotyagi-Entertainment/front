import { Layout, List, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import { useGetDiariesListQuery } from '../../../shared/api/Diary/DiaryRequest.ts'
import { DiaryListItem } from '../../../entities/ui/Diary/DiaryListItem.tsx'

const { Title } = Typography
const DiaryAdmin = () => {
  const { id } = useParams()
  const { data } = useGetDiariesListQuery({ userId: id! })
  return (
    <Layout>
      <Title>Diary</Title>
      <List>
        {data!.map(item => (
          <DiaryListItem
            item={item}
            key={item.id}
          />
        ))}
      </List>
    </Layout>
  )
}

export default DiaryAdmin
