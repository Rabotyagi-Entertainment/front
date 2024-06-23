import { Select, Space } from 'antd'
import { OptionProps } from 'antd/es/mentions'

interface ChangeStatusProps {
  fetchCallback: (value: string) => void
  options: OptionProps['options']
  defaultValue: string
}

export const ChangeStatus = ({ fetchCallback, options, defaultValue }: ChangeStatusProps) => {
  const handleChange = (value: string) => {
    fetchCallback(value)
  }

  return (
    <Space>
      <Select
        defaultValue={defaultValue}
        onChange={handleChange}
        options={options}
      />
    </Space>
  )
}
