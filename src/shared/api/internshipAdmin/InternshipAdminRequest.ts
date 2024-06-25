import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../static/authConfig.ts'
import {
  CreateInternshipCompanyPayload,
  CreateInternshipCompanyResponse,
  GetAdminStudentInternshipPayload,
  GetAdminStudentInternshipProgressPayload,
  GetAdminStudentInternshipProgressResponse,
  GetAdminStudentInternshipResponse,
  GetCompaniesPayload,
  GetCompaniesResponse,
  GetStudentsListSearchablePayload,
  GetStudentsListSearchableResponse,
  GetStudentsStatusesPayload,
  GetStudentsStatusesResponse,
  GetStudentsTablePayload,
  GetStudentsTableResponse,
  LeaveCommentProgressPayload,
  LeaveCommentProgressResponse,
} from './InternshipAdminDataSource.ts'

export const internshipAdminApi = createApi({
  reducerPath: 'internshipAdminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}`,
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
    GetCompanies: builder.query<GetCompaniesResponse, GetCompaniesPayload>({
      query: () => `admin/internship/company`,
    }),
    CreateCompany: builder.mutation<CreateInternshipCompanyResponse, CreateInternshipCompanyPayload>({
      query: payload => ({
        url: `admin/internship/company`,
        method: 'POST',
        body: payload,
      }),
    }),
    GetStudentsParameters: builder.query<GetStudentsListSearchableResponse, GetStudentsListSearchablePayload>({
      query: ({ search, company, group }) => {
        return `admin/internship/students?${search ? `search=${search}&` : ''}${company ? `company=${company}&` : ''}${group ? `group=${group}&` : ''}`
      },
    }),
    ExportStudentTable: builder.query<GetStudentsTableResponse, GetStudentsTablePayload>({
      query: () => `admin/internship/students/table`,
    }),
    GetStudentsStatuses: builder.query<GetStudentsStatusesResponse, GetStudentsStatusesPayload>({
      query: ({ userId }) => `admin/internship//${userId}`,
    }),
    GetStudentsAdminInternships: builder.query<GetAdminStudentInternshipResponse, GetAdminStudentInternshipPayload>({
      query: ({ studentId }) => `admin/internship/progress/student/${studentId}`,
    }),
    GetStudentsAdminInternshipsProgress: builder.query<
      GetAdminStudentInternshipProgressResponse,
      GetAdminStudentInternshipProgressPayload
    >({
      query: ({ studentId }) => `admin/internship/internship/student/${studentId}`,
    }),
    Comment: builder.mutation<LeaveCommentProgressResponse, LeaveCommentProgressPayload>({
      query: ({ text, internshipProgressId }) => ({
        url: `admin/internship/progress/${internshipProgressId}`,
        method: 'POST',
        body: { text: text },
      }),
    }),
  }),
})

export const {
  useGetCompaniesQuery,
  useCreateCompanyMutation,
  useCommentMutation,
  useExportStudentTableQuery,
  useGetStudentsParametersQuery,
  useLazyGetStudentsParametersQuery,
  useGetStudentsStatusesQuery,
  useGetStudentsAdminInternshipsProgressQuery,
  useLazyGetStudentsAdminInternshipsQuery,
  useGetStudentsAdminInternshipsQuery,
} = internshipAdminApi
