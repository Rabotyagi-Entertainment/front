import { Collapse, CollapseProps, Empty, Flex, Layout, Spin, Typography } from 'antd'
import { useLazyGetDiariesListQuery } from '../../../shared'
import { useParams } from 'react-router-dom'
import { GetDiaryListResponse } from '../../../shared/api/Diary/DiaryDataSource.ts'
import { CreateDiaryModal, DeleteDiaryModal } from '../../../Features'
import { useEffect } from 'react'
import { WorkModeMapper } from '../../../shared/library/utils/utils.ts'
import { DiaryListItem } from '../../../entities'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'

const { Title, Text } = Typography

const DiaryStudent = () => {
  const { id } = useParams()
  const [trigger, { data, isLoading }] = useLazyGetDiariesListQuery()
  const breakPoint = useBreakpoint()

  const createPanels = (data: GetDiaryListResponse): CollapseProps['items'] => {
    return data.map(item => ({
      key: item.id,
      label: (
        <Flex justify={'space-between'}>
          <Text>{`${item.companyName} - ${item.createdAt.split('T')[0]} - ${WorkModeMapper[item.diaryType]}`}</Text>
          <DeleteDiaryModal
            diaryId={item.id}
            refetchCallback={() => trigger({ internshipId: id! })}
          />
        </Flex>
      ),
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
          <Title level={breakPoint.xs ? 2 : 1}>{'Дневники'}</Title>
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
