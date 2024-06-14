import { DiaryTypeEnum } from './DiaryTypeEnum.ts'
import { CommentType } from '../internship/Comment.ts'

export interface UserDiary {
  id: string
  diaryType: DiaryTypeEnum
  diaryState: string
  createdAt: string
  comments: CommentType[]
  studentFullName: string | null
  curatorFullName: string | null
  taskReportTable: string | null
  studentCharacteristics: string | null
  companyName: string
  orderNumber: string | null
  workName: string | null
  planTable: string | null
}
