import { StatusEnum } from './Status.ts'
import { CommentType } from './Comment.ts'

export interface Company {
  studentId: string
  companyName: string
  status: StatusEnum
  internshipProgressId: string
  comments: CommentType[]
}
