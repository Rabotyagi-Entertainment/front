import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../static/authConfig.ts'
import {
  CreateDiaryPayload,
  CreateDiaryResponse,
  DeleteDiaryPayload,
  DeleteDiaryResponse,
  EditDiaryAdditionalInformationPayload,
  EditDiaryAdditionalInformationResponse,
  EditDiaryGeneralInformationPayload,
  EditDiaryGeneralInformationResponse,
  GetDiaryListPayload,
  GetDiaryListResponse,
  GetMyDiaryFilePayload,
  GetMyDiaryFileResponse,
  LeaveCommentPayload,
  LeaveCommentResponse,
  LoadTaskReportPayload,
  LoadTaskReportResponse,
} from './DiaryDataSource.ts'

export const diaryApi = createApi({
  reducerPath: 'diaryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}diary/`,
    prepareHeaders: headers => {
      const token = localStorage.getItem('userToken')

      if (token && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${token!}`)
      }
      headers.set('Content-Type', 'application/json')

      return headers
    },
  }),
  endpoints: builder => ({
    GetDiariesList: builder.query<GetDiaryListResponse, GetDiaryListPayload>({
      query: ({ userId, internshipId }) =>
        `list?${userId ? `userId=${userId}` : ''}&${internshipId ? `internshipId=${internshipId}` : ''}`,
    }),
    GetMyDiaryFile: builder.query<GetMyDiaryFileResponse, GetMyDiaryFilePayload>({
      query: ({ diaryId }) => `${diaryId}/tg`,
    }),
    EditGeneralInfo: builder.mutation<EditDiaryGeneralInformationResponse, EditDiaryGeneralInformationPayload>({
      query: ({ diaryId, payload }) => ({
        url: `${diaryId}`,
        method: 'PUT',
        body: payload,
      }),
    }),
    CreatePracticeDiary: builder.mutation<CreateDiaryResponse, CreateDiaryPayload>({
      query: ({ internshipId, diaryType }) => ({
        url: `${internshipId}/template?diaryType=${diaryType}`,
        method: 'POST',
      }),
    }),
    EditAdditionalInfo: builder.mutation<EditDiaryAdditionalInformationResponse, EditDiaryAdditionalInformationPayload>(
      {
        query: ({ diaryId, payload }) => ({
          url: `${diaryId}/additional-info`,
          method: 'PUT',
          body: payload,
        }),
      }
    ),
    LoadReport: builder.mutation<LoadTaskReportResponse, LoadTaskReportPayload>({
      query: ({ diaryId, file }) => ({
        url: `${diaryId}/xls-file`,
        method: 'POST',
        body: JSON.stringify(file),
      }),
    }),
    LeaveCommentDiary: builder.mutation<LeaveCommentResponse, LeaveCommentPayload>({
      query: ({ diaryId, text }) => ({
        url: `${diaryId}/comment`,
        method: 'POST',
        body: { text: text },
      }),
    }),
    DeleteDiary: builder.mutation<DeleteDiaryResponse, DeleteDiaryPayload>({
      query: ({ diaryId }) => ({
        url: `${diaryId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useCreatePracticeDiaryMutation,
  useEditAdditionalInfoMutation,
  useEditGeneralInfoMutation,
  useGetDiariesListQuery,
  useLazyGetDiariesListQuery,
  useLeaveCommentDiaryMutation,
  useLazyGetMyDiaryFileQuery,
  useLoadReportMutation,
  useDeleteDiaryMutation,
} = diaryApi
