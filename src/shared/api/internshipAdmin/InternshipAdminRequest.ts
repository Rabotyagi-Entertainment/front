import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../static/authConfig.ts'
import {
  CreateInternshipCompanyPayload,
  CreateInternshipCompanyResponse,
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
      query: ({ search, company, group }) =>
        `admin/internship/students?search=${search}&company=${company}&group=${group}`,
    }),
    ExportStudentTable: builder.query<GetStudentsTableResponse, GetStudentsTablePayload>({
      query: () => `admin/internship/students/table`,
    }),
    GetStudentsStatuses: builder.query<GetStudentsStatusesResponse, GetStudentsStatusesPayload>({
      query: ({ userId }) => `admin/internship//${userId}`,
    }),
    Comment: builder.mutation<LeaveCommentProgressResponse, LeaveCommentProgressPayload>({
      query: ({ text, internshipProgressId }) => ({
        url: `/internship/progress/${internshipProgressId}/status`,
        method: 'POST',
        body: { text },
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
  useGetStudentsStatusesQuery,
} = internshipAdminApi
