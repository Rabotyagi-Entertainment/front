import { Collapse, CollapseProps, Empty, Layout, Typography } from 'antd'
import { useParams } from 'react-router-dom'
import { useLazyGetDiariesListQuery } from '../../../shared/api/Diary/DiaryRequest.ts'
import { useEffect } from 'react'
import { GetDiaryListResponse } from '../../../shared/api/Diary/DiaryDataSource.ts'
import { WorkModeMapper } from '../../../shared/library/utils/utils.ts'
import { DiaryAdminListItem } from '../../../entities/ui/Diary/DiaryAdminItem'

const { Title } = Typography
const DiaryAdmin = () => {
  const { id } = useParams()
  const [trigger, { data }] = useLazyGetDiariesListQuery()

  const createPanels = (data: GetDiaryListResponse): CollapseProps['items'] => {
    return data.map(item => ({
      key: item.id,
      label: <span>{`${item.companyName} - ${item.createdAt.split('T')[0]} - ${WorkModeMapper[item.diaryType]}`}</span>,
      children: (
        <DiaryAdminListItem
          item={item}
          refetchCallback={() => trigger({ internshipId: id! })}
        />
      ),
    }))
  }

  useEffect(() => {
    trigger({ internshipId: id! })
  }, [])

  return (
    <Layout>
      <Title>Diary</Title>
      {data ? <Collapse items={createPanels(data!)} /> : <Empty description={'Пока нет дневников'} />}
    </Layout>
  )
}

export default DiaryAdmin
