import { CommentType } from './Comment.ts'
import { Index } from '../internshipProgress'

export interface Company {
  studentId: string
  companyName: string
  status: Index
  internshipProgressId: string
  comments: CommentType[]
}
