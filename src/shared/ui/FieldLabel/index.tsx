import { PropsWithChildren } from 'react'
import { Flex } from 'antd'

interface FieldLabelProps extends PropsWithChildren {
  title: string
}

export const FieldLabel = ({ children, title }: FieldLabelProps) => {
  return (
    <Flex
      gap={2}
      align={'center'}
    >
      <b>{title}</b>
      <span>{children}</span>
    </Flex>
  )
}
