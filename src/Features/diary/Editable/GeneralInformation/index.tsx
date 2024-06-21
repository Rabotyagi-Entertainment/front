import { Button, DatePicker, Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { GeneralInfoPayload } from '../../../../shared/api/Diary/DiaryDataSource.ts'
import TextArea from 'antd/es/input/TextArea'
import { useEditGeneralInfoMutation } from '../../../../shared/api/Diary/DiaryRequest.ts'
import { UserDiary } from '../../../../shared/types/diary/UserDiary.ts'

type FieldType = GeneralInfoPayload

interface GeneralInformationProps
  extends Pick<UserDiary, 'orderNumber' | 'curatorFullName' | 'studentCharacteristics'> {
  diaryId: string
}

export const GeneralInformation = ({
  diaryId,
  curatorFullName,
  studentCharacteristics,
  orderNumber,
}: GeneralInformationProps) => {
  const [trigger] = useEditGeneralInfoMutation()
  const [form] = useForm()

  const onFinish = (values: FieldType) => {
    trigger({ payload: values, diaryId: diaryId })
  }

  return (
    <Form
      name='basic'
      form={form}
      initialValues={{
        orderNumber: orderNumber,
        orderDate: '',
        curatorFullName: curatorFullName,
        studentCharacteristics: studentCharacteristics,
      }}
      onFinish={onFinish}
    >
      <Form.Item<FieldType>
        label='Номер приказа'
        name='orderNumber'
      >
        <Input defaultValue={orderNumber!} />
      </Form.Item>

      <Form.Item<FieldType>
        label='Дата приказа'
        name='orderDate'
        rules={[{ type: 'date' }]}
      >
        <DatePicker />
      </Form.Item>

      <Form.Item<FieldType>
        label='Имя Куратора'
        name='curatorFullName'
      >
        <Input defaultValue={curatorFullName!} />
      </Form.Item>

      <Form.Item<FieldType>
        label='Характеристика'
        name='studentCharacteristics'
      >
        <TextArea defaultValue={studentCharacteristics!} />
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
        >
          Добавить главную информацию
        </Button>
      </Form.Item>
    </Form>
  )
}
