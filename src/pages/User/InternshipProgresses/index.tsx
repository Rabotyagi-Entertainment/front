import { Flex, Layout, Spin, Typography } from 'antd'
import { useLazyGetStudentInternshipProgressQuery } from '../../../shared/api/Internship/InternshipRequest.ts'
import { InternshipProgressItem } from '../../../entities/ui/InternshipProgressItem'
import { useEffect } from 'react'
import { CreateModal } from '../../../Features/internshipProgress/CreateModal'
import { InternshipProgressResponse } from '../../../shared/api/Internship/InternshipDataSource.ts'
import { InternshipCompanyType } from '../../../shared/types/Company'
import { InternshipProgressEnum } from '../../../shared/types/internshipProgress/InternshipProgressEnum.ts'
import useBreakpoint from 'antd/es/grid/hooks/useBreakpoint'

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
        {data! && !findAcceptedOffer(data!) && (
          <CreateModal
            refetchCallback={() => trigger({})}
            selectedCompanies={selectedCompanies(data!)}
          />
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
