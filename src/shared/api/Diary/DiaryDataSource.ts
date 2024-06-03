import { DiaryType } from '../../types/diary/Diary.ts'

export interface GetMyDiaryPayload {}
type MyDiaryType = DiaryType[]
export interface GetMyDiaryResponse extends MyDiaryType {}

export interface GetMyDiaryFilePayload {
  diaryId: string
}
export interface GetMyDiaryFileResponse {}

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
  diaryType: DiaryType
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
