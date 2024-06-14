import { UserDiary } from '../../types/diary/UserDiary.ts'
import { DiaryTypeEnum } from '../../types/diary/DiaryTypeEnum.ts'

export interface GetMyDiaryPayload {}
export type GetMyDiaryResponse = UserDiary[]

export interface GetMyDiaryFilePayload {
  diaryId: string
}
export interface GetMyDiaryFileResponse {}

export interface GetDiaryListPayload {
  userId?: string
  internshipId?: string
}
export type GetDiaryListResponse = UserDiary[]

type GeneralInfoPayload = {
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

type AdditionalInfoPayload = {
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
  file: File
}
export interface LoadTaskReportResponse {}
