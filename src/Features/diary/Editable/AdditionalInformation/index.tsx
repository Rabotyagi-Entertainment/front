import { Button, Form, Input } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { AdditionalInfoPayload } from '../../../../shared/api/Diary/DiaryDataSource.ts'
import { useEditAdditionalInfoMutation } from '../../../../shared/api/Diary/DiaryRequest.ts'
import { UserDiary } from '../../../../shared/types/diary/UserDiary.ts'

type FieldType = AdditionalInfoPayload

interface AdditionalInformationProps extends Pick<UserDiary, 'workName' | 'planTable'> {
  diaryId: string
}

export const AdditionalInformation = ({ diaryId, planTable, workName }: AdditionalInformationProps) => {
  const [trigger] = useEditAdditionalInfoMutation()
  const [form] = useForm()

  const onFinish = (values: FieldType) => {
    trigger({ payload: values, diaryId: diaryId })
  }

  return (
    <Form
      name='basic'
      form={form}
      initialValues={{ workName: workName, planTable: planTable }}
      onFinish={onFinish}
    >
      <Form.Item<FieldType>
        label='Название работы'
        name='workName'
      >
        <Input />
      </Form.Item>

      <Form.Item<FieldType>
        label='Планирование работ'
        name='planTable'
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button
          type='primary'
          htmlType='submit'
        >
          Добавить дополнительную информацию
        </Button>
      </Form.Item>
    </Form>
  )
}
