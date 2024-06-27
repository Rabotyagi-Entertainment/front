import { UserDiary, DiaryTypeEnum, RolesEnum } from '../../types'

export interface GetMyDiaryPayload {}
export type GetMyDiaryResponse = UserDiary[]

export interface GetMyDiaryFilePayload {
  diaryId: string
}
export type GetMyDiaryFileResponse = string

export interface GetDiaryListPayload {
  userId?: string
  internshipId?: string
}
export type GetDiaryListResponse = UserDiary[]

export type GeneralInfoPayload = {
  orderNumber: string
  orderDate: string
  curatorFullName: string
  studentCharacteristics: string
}
export interface EditDiaryGeneralInformationPayload {
  diaryId: string
  payload: GeneralInfoPayload
}
export interface EditDiaryGeneralInformationResponse {}

export interface CreateDiaryPayload {
  internshipId: string
  diaryType: DiaryTypeEnum
}
export interface CreateDiaryResponse {}

export type AdditionalInfoPayload = {
  workName: string
  planTable: string
}
export interface EditDiaryAdditionalInformationPayload {
  diaryId: string
  payload: AdditionalInfoPayload
}
export interface EditDiaryAdditionalInformationResponse {}

export interface LoadTaskReportPayload {
  diaryId: string
  file: FormData
}
export interface LoadTaskReportResponse {}

export interface LeaveCommentPayload {
  diaryId: string
  text: string
}
export interface LeaveCommentResponse {
  text: string
  author: string
  roleType: RolesEnum
}

export interface DeleteDiaryPayload {
  diaryId: string
}
export interface DeleteDiaryResponse {}
