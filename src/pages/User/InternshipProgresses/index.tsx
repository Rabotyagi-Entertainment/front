import { Button, Flex, Layout, Spin, Tooltip, Typography } from 'antd'

import { InternshipProgressItem } from '../../../entities'
import { useEffect } from 'react'
import { CreateModal } from '../../../Features'
import { InternshipProgressResponse } from '../../../shared/api/Internship/InternshipDataSource.ts'
import {
  InternshipCompanyType,
  InternshipProgressEnum,
  useLazyGetStudentInternshipProgressQuery,
} from '../../../shared'

import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'
import { PlusOutlined } from '@ant-design/icons'

const { Title } = Typography

const findAcceptedOffer = (data: InternshipProgressResponse): string | undefined => {
  const company = data.find(i => i.progressStatus === InternshipProgressEnum.ACCEPT_OFFER)
  return company ? company.company.id : undefined
}

const selectedCompanies = (data: InternshipProgressResponse): InternshipCompanyType[] => {
  return data!.map(item => {
    return {
      id: item.company.id,
      name: item.company.name,
      status: item.progressStatus,
    }
  })
}

export const InternshipProgressStudent = () => {
  const [trigger, { data, isLoading }] = useLazyGetStudentInternshipProgressQuery({})
  const breakPoint = useBreakpoint()

  useEffect(() => {
    trigger({})
  }, [])

  if (isLoading) {
    return <Spin />
  }

  return (
    <Layout>
      <Flex
        justify={'space-between'}
        align={'center'}
        wrap
        style={{ marginBottom: '1rem' }}
      >
        <Title
          style={{ marginTop: 0 }}
          level={breakPoint.sm ? 5 : 4}
        >
          {'Собеседования'}
        </Title>
        {data! && !findAcceptedOffer(data!) ? (
          <CreateModal
            refetchCallback={() => trigger({})}
            selectedCompanies={selectedCompanies(data!)}
          />
        ) : (
          <Tooltip title={'У вас уже есть активная стажировка'}>
            <Button
              disabled
              type={'primary'}
            >
              <PlusOutlined />
            </Button>
          </Tooltip>
        )}
      </Flex>
      {data! ? (
        <InternshipProgressItem
          acceptedCompany={findAcceptedOffer(data!)}
          refetchCallback={() => trigger({})}
          dataSource={data! ? data : []}
        />
      ) : (
        <Spin />
      )}
    </Layout>
  )
}
