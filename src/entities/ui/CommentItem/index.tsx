import { Flex, List, Typography } from 'antd'
import { RolesEnum } from '../../../shared/types/user/RolesEnum.ts'
import { CommentType } from '../../../shared/types/internship/Comment.ts'

const { Title, Text } = Typography

type COMMENT_ITEM_PROPS = { comment: CommentType }

export const CommentItem = ({ comment: { roleType, text, author } }: COMMENT_ITEM_PROPS) => {
  return (
    <List.Item
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: `${roleType === RolesEnum.USER ? 'right' : 'left'}`,
      }}
    >
      <Flex
        vertical
        style={{
          padding: '0.2rem 0.5rem',
          backgroundColor: `${roleType === RolesEnum.USER ? 'lightBlue' : 'yellow'}`,
          borderRadius: `${roleType === RolesEnum.USER ? '0.5rem 0.5rem 0 0.5rem' : '0.5rem 0.5rem 0.5rem 0'}`,
        }}
      >
        <Title
          style={{ marginTop: 0 }}
          level={5}
        >
          {author}
        </Title>
        <Text style={{ width: 'fit-content' }}>{text}</Text>
      </Flex>
    </List.Item>
  )
}
