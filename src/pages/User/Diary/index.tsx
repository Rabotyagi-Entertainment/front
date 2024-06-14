import { Collapse, CollapseProps, Empty, Flex, Layout, Spin, Typography } from 'antd'
import { useGetDiariesListQuery } from '../../../shared/api/Diary/DiaryRequest.ts'
import { useParams } from 'react-router-dom'
import { GetDiaryListResponse } from '../../../shared/api/Diary/DiaryDataSource.ts'
import { DiaryListItem } from '../../../entities/ui/Diary/DiaryListItem.tsx'
import { CreateDiaryModal } from '../../../Features/diary/CreateDiaryModal'

const { Title } = Typography

const createPanels = (data: GetDiaryListResponse): CollapseProps['items'] => {
  return data.map(item => ({
    key: item.id,
    label: <span>{`${item.companyName} - ${item.createdAt.split('T')[0]}`}</span>,
    children: <DiaryListItem item={item} />,
  }))
}

const DiaryStudent = () => {
  const { id } = useParams()
  const { data, isFetching } = useGetDiariesListQuery({ internshipId: id! })
  if (isFetching) {
    return <Spin />
  }
  return (
    <>
      <Layout>
        <Flex
          justify={'space-between'}
          align={'center'}
        >
          <Title>{'Дневники'}</Title>
          <CreateDiaryModal internshipId={id!} />
        </Flex>
        {data ? <Collapse items={createPanels(data!)} /> : <Empty description={'Пока нет дневников'} />}
      </Layout>
    </>
  )
}

export default DiaryStudent
