import { CommentType } from './Comment.ts'
import { InternshipProgressEnum } from '../internshipProgress/InternshipProgressEnum.ts'

export interface Company {
  studentId: string
  companyName: string
  status: InternshipProgressEnum
  internshipProgressId: string
  comments: CommentType[]
}
