import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  AddCompanyUserPayload,
  AddCompanyUserResponse,
  CreateCompanyPayload,
  CreateCompanyResponse,
  DiaryProgressStatusPayload,
  DiaryProgressStatusResponse,
  GetStudentInternshipPayload,
  GetStudentInternshipProgressPayload,
  GetStudentInternshipProgressResponse,
  GetStudentInternshipResponse,
  InternshipProgressStatusPayload,
  InternshipProgressStatusResponse,
  LeaveCommentInternshipProgressPayload,
  LeaveCommentInternshipProgressResponse,
  RemoveCompanyUserPayload,
  RemoveCompanyUserResponse,
  SetCompanyStatusPayload,
  SetCompanyStatusResponse,
  UpdateInternshipProgressStatusPayload,
  UpdateInternshipProgressStatusResponse,
} from './InternshipDataSource.ts'
import { baseUrl } from '../static/authConfig.ts'

export const internshipApi = createApi({
  reducerPath: 'internshipApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}internship/`,
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
    AddCompany: builder.mutation<AddCompanyUserResponse, AddCompanyUserPayload>({
      query: ({ companyId, payload }) => ({
        url: `company/${companyId}`,
        method: 'PUT',
        body: payload,
      }),
    }),
    RemoveCompany: builder.mutation<RemoveCompanyUserResponse, RemoveCompanyUserPayload>({
      query: ({ companyId }) => ({
        url: `company/${companyId}`,
        method: 'DELETE',
      }),
    }),
    CreateCompany: builder.mutation<CreateCompanyResponse, CreateCompanyPayload>({
      query: ({ name }) => ({
        url: `company/create`,
        method: 'POST',
        body: name,
      }),
    }),
    ChangeStatus: builder.mutation<SetCompanyStatusResponse, SetCompanyStatusPayload>({
      query: ({ companyId, payload }) => ({
        url: `company/${companyId}/status?status=${payload}`,
        method: 'PUT',
      }),
    }),
    setNewStatus: builder.mutation<InternshipProgressStatusResponse, InternshipProgressStatusPayload>({
      query: ({ internshipProgressId, text }) => ({
        url: `internship/progress/${internshipProgressId}/status`,
        method: 'POST',
        body: {
          text,
        },
      }),
    }),
    setNewStatusDiary: builder.mutation<DiaryProgressStatusResponse, DiaryProgressStatusPayload>({
      query: ({ practiceProgressId, text }) => ({
        url: `internship/progress/diary/${practiceProgressId}`,
        method: 'POST',
        body: {
          text,
        },
      }),
    }),
    UpdateStatusInternship: builder.mutation<
      UpdateInternshipProgressStatusResponse,
      UpdateInternshipProgressStatusPayload
    >({
      query: ({ internshipProgressId, payload }) => ({
        url: `internship/progress/${internshipProgressId}/update`,
        method: 'PATCH',
        body: payload,
      }),
    }),
    GetStudentInternshipProgress: builder.query<
      GetStudentInternshipProgressResponse,
      GetStudentInternshipProgressPayload
    >({
      query: () => `progress/student`,
    }),
    GetStudentInternships: builder.query<GetStudentInternshipResponse, GetStudentInternshipPayload>({
      query: () => `internship/student`,
    }),
    LeaveCommentUser: builder.mutation<LeaveCommentInternshipProgressResponse, LeaveCommentInternshipProgressPayload>({
      query: ({ text, companyId }) => ({
        url: `progress/${companyId}/status`,
        method: 'POST',
        body: { text: text },
      }),
    }),
  }),
})

export const {
  useAddCompanyMutation,
  useChangeStatusMutation,
  useCreateCompanyMutation,
  useSetNewStatusMutation,
  useSetNewStatusDiaryMutation,
  useUpdateStatusInternshipMutation,
  useGetStudentInternshipProgressQuery,
  useLazyGetStudentInternshipProgressQuery,
  useRemoveCompanyMutation,
  useGetStudentInternshipsQuery,
  useLeaveCommentUserMutation,
} = internshipApi
