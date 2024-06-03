import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  AddCompanyUserPayload,
  AddCompanyUserResponse,
  CreateCompanyPayload,
  CreateCompanyResponse,
  DiaryProgressStatusPayload,
  DiaryProgressStatusResponse,
  InternshipProgressStatusPayload,
  InternshipProgressStatusResponse,
  SetCompanyStatusPayload,
  SetCompanyStatusResponse,
  UpdateInternshipProgressStatusPayload,
  UpdateInternshipProgressStatusResponse,
} from './InternshipDataSource.ts'
import { baseUrl } from '../static/authConfig.ts'

export const internshipApi = createApi({
  reducerPath: 'internshipApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/internship/`,
    mode: 'no-cors',
  }),
  endpoints: builder => ({
    AddCompany: builder.mutation<AddCompanyUserResponse, AddCompanyUserPayload>({
      query: ({ companyId, payload }) => ({
        url: `company/${companyId}`,
        method: 'PUT',
        body: payload,
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
        url: `company/${companyId}/status`,
        method: 'PUT',
        body: payload,
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
  }),
})

export const {
  useAddCompanyMutation,
  useChangeStatusMutation,
  useCreateCompanyMutation,
  useSetNewStatusMutation,
  useSetNewStatusDiaryMutation,
  useUpdateStatusInternshipMutation,
} = internshipApi
