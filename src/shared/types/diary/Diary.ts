import { DiaryTypeEnum } from './DiaryTypeEnum.ts'

export interface DiaryType {
  id: string
  diaryType: DiaryTypeEnum
  createdAt: string
  studentFullName: string
  curatorFullName: string
  taskReportTable: string
  studentCharacteristics: string
  companyName: string
  orderNumber: string
  workName: string
  planTable: string
}
