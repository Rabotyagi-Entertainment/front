import { DiaryStateTypeEnum } from '../../types/diary/DiaryStateTypeEnum.ts'

export type ExportStudentsPayload = {}
export type ExportStudentsResponse = {}

export type LeaveCommentPracticeDiaryPayload = {
  diaryId: string
  text: string
}
export type LeaveCommentPracticeDiaryResponse = {}

export type DiaryStateChangeStatusPayload = {
  diaryId: string
  payload: DiaryStateTypeEnum
}
export type DiaryStateChangeStatusResponse = {}
