import { Collapse, CollapseProps, Empty, Flex, Layout, Spin, Typography } from 'antd'
import { useLazyGetDiariesListQuery } from '../../../shared/api/Diary/DiaryRequest.ts'
import { useParams } from 'react-router-dom'
import { GetDiaryListResponse } from '../../../shared/api/Diary/DiaryDataSource.ts'
import { DiaryListItem } from '../../../entities/ui/Diary/DiaryListItem.tsx'
import { CreateDiaryModal } from '../../../Features/diary/CreateDiaryModal'
import { useEffect } from 'react'
import { WorkModeMapper } from '../../../shared/library/utils/utils.ts'

const { Title } = Typography

const DiaryStudent = () => {
  const { id } = useParams()
  const [trigger, { data, isLoading }] = useLazyGetDiariesListQuery()

  const createPanels = (data: GetDiaryListResponse): CollapseProps['items'] => {
    return data.map(item => ({
      key: item.id,
      label: <span>{`${item.companyName} - ${item.createdAt.split('T')[0]} - ${WorkModeMapper[item.diaryType]}`}</span>,
      children: (
        <DiaryListItem
          item={item}
          refetchCallback={() => trigger({ internshipId: id! })}
        />
      ),
    }))
  }

  useEffect(() => {
    trigger({ internshipId: id! })
  }, [])

  if (isLoading) {
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
          <CreateDiaryModal
            internshipId={id!}
            refetchCallback={() => trigger({ internshipId: id! })}
          />
        </Flex>
        {data ? <Collapse items={createPanels(data!)} /> : <Empty description={'Пока нет дневников'} />}
      </Layout>
    </>
  )
}

export default DiaryStudent
