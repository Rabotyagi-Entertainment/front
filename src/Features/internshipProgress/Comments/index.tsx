import { CommentType } from '../../../shared/types/internship/Comment.ts'
import { useState } from 'react'
import { Button, Empty, List, Modal } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { CommentItem } from '../../../entities/ui/CommentItem'

type messageCredentials = { value: string; id: string }

interface CommentsModalType {
  comments: CommentType[]
  title: string
  id: string
  sendMessageCallback: (data: messageCredentials) => void
}

export const CommentsModal = ({ comments, title, id, sendMessageCallback }: CommentsModalType) => {
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
    sendMessageCallback({ value: value, id: id })
    setValue('')
  }

  return (
    <>
      <Button onClick={showModal}>{title}</Button>
      <Modal
        title={title}
        open={show}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button
            type='primary'
            onClick={handleSendComment}
          >
            Отправить
          </Button>,
        ]}
      >
        <List
          style={{
            minHeight: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxHeight: '30rem',
            overflowY: 'auto',
          }}
        >
          {comments! && comments.length > 0 ? (
            [...comments].reverse().map((item, number) => {
              return (
                <CommentItem
                  key={number}
                  comment={item}
                />
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
