import { PracticeDiary } from '../../../entities/types/practiceDiary.ts'
import { CommentType } from '../../types/internship/Comment.ts'
import { InternshipProgressEnum } from '../../types/internshipProgress/InternshipProgressEnum.ts'

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

export interface RemoveCompanyUserPayload {
  companyId: string
}
export interface RemoveCompanyUserResponse {}

export interface CreateCompanyPayload {
  name: string
}
export interface CreateCompanyResponse {}

export interface SetCompanyStatusPayload {
  companyId: string
  payload: InternshipProgressEnum
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

export interface GetStudentInternshipProgressPayload {}
export type InternshipProgressResponse = {
  id: string
  priority: number
  createdAt: string
  company: {
    id: string
    name: 'string'
    isPartner: boolean
  }
  practiceDiaries: PracticeDiary[]
  startedAt: string
  endedAt: string
  progressStatus: InternshipProgressEnum
  comments: CommentType[]
}[]
export interface GetStudentInternshipProgressResponse extends InternshipProgressResponse {}

export interface GetStudentInternshipPayload {}
export type InternshipResponse = {
  id: string
  company: {
    id: string
    name: string
    isPartner: boolean
  }
  practiceDiaries: PracticeDiary[]
  startedAt: string
  endedAt: null
}[]
export interface GetStudentInternshipResponse extends InternshipResponse {}
