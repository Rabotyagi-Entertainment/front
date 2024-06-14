import { DiaryTypeEnum } from '../../shared/types/diary/DiaryTypeEnum.ts'
import { CommentType } from '../../shared/types/internship/Comment.ts'

export interface PracticeDiary {
  id: string
  diaryType: DiaryTypeEnum
  diaryState: string
  createdAt: string
  comments: CommentType[]
  studentFullName: string
  curatorFullName: string
  taskReportTable: string
  studentCharacteristics: string
  companyName: string
  orderNumber: string
  workName: string
  planTable: string
}
