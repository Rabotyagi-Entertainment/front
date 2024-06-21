import { Layout, List, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import { useLazyGetDiariesListQuery } from '../../../shared/api/Diary/DiaryRequest.ts'
import { DiaryListItem } from '../../../entities/ui/Diary/DiaryListItem.tsx'
import { useEffect } from 'react'

const { Title } = Typography
const DiaryAdmin = () => {
  const { id } = useParams()
  const [trigger, { data }] = useLazyGetDiariesListQuery()

  useEffect(() => {
    trigger({ internshipId: id! })
  }, [])

  return (
    <Layout>
      <Title>Diary</Title>
      <List>
        {data!.map(item => (
          <DiaryListItem
            refetchCallback={() => trigger({ internshipId: id! })}
            item={item}
            key={item.id}
          />
        ))}
      </List>
    </Layout>
  )
}

export default DiaryAdmin
