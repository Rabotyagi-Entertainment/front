import { Collapse, CollapseProps, Layout, Typography } from 'antd'
import { useGetMyDiariesQuery } from '../../../shared/api/Diary/DiaryRequest.ts'
import { GetMyDiaryResponse } from '../../../shared/api/Diary/DiaryDataSource.ts'
import { DiaryListItem } from '../../../entities/ui/Diary/DiaryListItem.tsx'

const { Title } = Typography

const createPanels = (items: GetMyDiaryResponse): CollapseProps['items'] => {
  return items.map(item => ({
    key: item.id,
    label: <span>{item.workName}</span>,
    children: <DiaryListItem item={item} />,
  }))
}

const Diary = () => {
  const { data } = useGetMyDiariesQuery({})
  return (
    <>
      <Layout>
        <Title>{'Дневники'}</Title>
        <Collapse items={createPanels(data!)} />
      </Layout>
    </>
  )
}

export default Diary
