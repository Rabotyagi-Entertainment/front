import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../static/authConfig.ts'
import {
  CreateDiaryPayload,
  CreateDiaryResponse,
  EditDiaryAdditionalInformationPayload,
  EditDiaryAdditionalInformationResponse,
  EditDiaryGeneralInformationPayload,
  EditDiaryGeneralInformationResponse,
  GetMyDiaryFilePayload,
  GetMyDiaryFileResponse,
  GetMyDiaryPayload,
  GetMyDiaryResponse,
  LoadTaskReportPayload,
  LoadTaskReportResponse,
} from './DiaryDataSource.ts'

export const diaryApi = createApi({
  reducerPath: 'diaryApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/diary/`,
    mode: 'no-cors',
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
    GetMyDiaries: builder.query<GetMyDiaryResponse, GetMyDiaryPayload>({
      query: () => 'list',
    }),
    GetMyDiaryFile: builder.query<GetMyDiaryFileResponse, GetMyDiaryFilePayload>({
      query: ({ diaryId }) => `${diaryId}`,
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
  }),
})

export const {
  useCreatePracticeDiaryMutation,
  useEditAdditionalInfoMutation,
  useEditGeneralInfoMutation,
  useGetMyDiariesQuery,
  useGetMyDiaryFileQuery,
  useLoadReportMutation,
} = diaryApi
