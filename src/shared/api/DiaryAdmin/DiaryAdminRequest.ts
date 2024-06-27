import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../static/authConfig.ts'
import {
  DiaryStateChangeStatusPayload,
  DiaryStateChangeStatusResponse,
  ExportStudentsPayload,
  ExportStudentsResponse,
  LeaveCommentPracticeDiaryPayload,
  LeaveCommentPracticeDiaryResponse,
} from './DiaryAdminDataSource.ts'

export const DiaryAdmin = createApi({
  reducerPath: 'DiaryAdmin',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}admin/diary/`,
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
    ExportStudentsTable: builder.query<ExportStudentsResponse, ExportStudentsPayload>({
      query: () => `students/table`,
    }),
    LeaveCommentAdmin: builder.mutation<LeaveCommentPracticeDiaryResponse, LeaveCommentPracticeDiaryPayload>({
      query: ({ diaryId, text }) => ({
        url: `${diaryId}/comment`,
        body: { text },
        method: 'POST',
      }),
    }),
    DiaryStateChange: builder.mutation<DiaryStateChangeStatusResponse, DiaryStateChangeStatusPayload>({
      query: ({ diaryId, payload }) => ({
        url: `${diaryId}/status`,
        method: 'PUT',
        body: payload,
      }),
    }),
  }),
})

export const { useLeaveCommentAdminMutation, useExportStudentsTableQuery, useDiaryStateChangeMutation } = DiaryAdmin
