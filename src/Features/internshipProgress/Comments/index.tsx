import { CommentType } from '../../../shared/types/internship/Comment.ts'
import { useState } from 'react'
import { Button, Empty, Flex, List, Modal, Typography } from 'antd'
import { RolesEnum } from '../../../shared/types/user/RolesEnum.ts'
import TextArea from 'antd/es/input/TextArea'
import { useCommentMutation } from '../../../shared/api/internshipAdmin/InternshipAdminRequest.ts'

interface CommentsModalType {
  comments: CommentType[]
  title: string
  companyId: string
  refetchCallback: () => void
}
const { Text, Title } = Typography

export const CommentsModal = ({ comments, title, companyId, refetchCallback }: CommentsModalType) => {
  const [trigger, result] = useCommentMutation()
  const [value, setValue] = useState<string>('')
  const [show, setShow] = useState<boolean>(false)

  const showModal = () => {
    setShow(true)
  }

  const handleOk = () => {
    setShow(false)
  }

  const handleCancel = () => {
    setShow(false)
  }

  const handleSendComment = () => {
    trigger({ internshipProgressId: companyId, text: value }).then(_ => {
      refetchCallback()
      setValue('')
    })
  }

  return (
    <>
      <Button onClick={showModal}>{title}</Button>
      <Modal
        title='Комментарии к стажировке'
        open={show}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            type='primary'
            loading={result.isLoading}
            onClick={handleSendComment}
          >
            Отправить
          </Button>,
        ]}
      >
        <List style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {comments! && comments.length > 0 ? (
            comments.map((item, number) => {
              return (
                <List.Item
                  key={number}
                  style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: `${item.roleType === RolesEnum.USER ? 'right' : 'left'}`,
                  }}
                >
                  <Flex
                    vertical
                    style={{ border: '1px black solid', borderRadius: '1rem', padding: '1rem' }}
                  >
                    <Title
                      style={{ marginTop: 0 }}
                      color={item.roleType === RolesEnum.USER ? 'black' : 'blue'}
                      level={5}
                    >
                      {item.author}
                    </Title>
                    <Text style={{ width: 'fit-content' }}>{item.text}</Text>
                  </Flex>
                </List.Item>
              )
            })
          ) : (
            <Empty description={'Комментариев пока нет'} />
          )}
        </List>
        <TextArea
          onChange={e => setValue(e.currentTarget.value)}
          value={value}
        />
      </Modal>
    </>
  )
}
