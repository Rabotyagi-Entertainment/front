import { UserWithCompany } from '../../types/user/UserWithCompany.ts'
import { Company } from '../../types/internship/Company.ts'

export interface CreateInternshipCompanyPayload {
  name: string
}
export interface CreateInternshipCompanyResponse {}

export interface GetStudentsListSearchablePayload {
  search: string
  company: string
  group: string
}
type UsersCompanyType = UserWithCompany[]
export interface GetStudentsListSearchableResponse extends UsersCompanyType {}

export interface GetStudentsTablePayload {}
export interface GetStudentsTableResponse {}

export interface GetStudentsStatusesPayload {
  userId: string
}
type StudentsCompanies = Company[]
export interface GetStudentsStatusesResponse extends StudentsCompanies {}

export interface LeaveCommentProgressPayload {
  internshipProgressId: string
  text: string
}
export interface LeaveCommentProgressResponse {}
