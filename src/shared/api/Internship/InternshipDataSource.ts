import { StatusEnum } from '../../types/internship/Status.ts'

type AddCompany = {
  priority: number
  status: string
  additionalInfo: string
}
export interface AddCompanyUserPayload {
  companyId: string
  payload: AddCompany
}
export interface AddCompanyUserResponse {}

export interface CreateCompanyPayload {
  name: string
}
export interface CreateCompanyResponse {}

export interface SetCompanyStatusPayload {
  companyId: string
  payload: StatusEnum
}
export interface SetCompanyStatusResponse {}

export interface InternshipProgressStatusPayload {
  internshipProgressId: string
  text: string
}
export interface InternshipProgressStatusResponse {}

export interface DiaryProgressStatusPayload {
  practiceProgressId: string
  text: string
}
export interface DiaryProgressStatusResponse {}

type InternshipProgressUpdate = {
  priority: number
  additionalInfo: string
}
export interface UpdateInternshipProgressStatusPayload {
  internshipProgressId: string
  payload: InternshipProgressUpdate
}
export interface UpdateInternshipProgressStatusResponse {}
