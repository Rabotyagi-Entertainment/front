import { StatusEnum } from './Status.ts'

export interface Company {
  studentId: string
  companyName: string
  status: StatusEnum
  internshipProgressId: string
  comments: Comment[]
}
