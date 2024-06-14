import { Layout, List, Typography } from 'antd'
import { useLazyGetStudentInternshipProgressQuery } from '../../../shared/api/Internship/InternshipRequest.ts'
import { InternshipProgressItem } from '../../../entities/ui/InternshipProgressItem'
import { useEffect } from 'react'

const { Title } = Typography

export const InternshipProgress = () => {
  const [trigger, result] = useLazyGetStudentInternshipProgressQuery({})

  useEffect(() => {
    trigger({})
  }, [])
  return (
    <>
      <Layout>
        <Title>{'Собеседования'}</Title>
        <List>
          <InternshipProgressItem
            refetchCallback={() => trigger({})}
            dataSource={result.data! ? result.data : []}
          />
        </List>
      </Layout>
    </>
  )
}
