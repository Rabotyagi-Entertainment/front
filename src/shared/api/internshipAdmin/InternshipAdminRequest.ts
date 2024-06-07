import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../static/authConfig.ts'
import {
  CreateInternshipCompanyPayload,
  CreateInternshipCompanyResponse,
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
    baseUrl: `${baseUrl}/admin/internship/`,
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
    CreateCompany: builder.mutation<CreateInternshipCompanyResponse, CreateInternshipCompanyPayload>({
      query: payload => ({
        url: `company`,
        method: 'POST',
        body: payload,
      }),
    }),
    GetStudentsParameters: builder.query<GetStudentsListSearchableResponse, GetStudentsListSearchablePayload>({
      query: ({ search, company, group }) => `students?search=${search}&company=${company}&group=${group}`,
    }),
    ExportStudentTable: builder.query<GetStudentsTableResponse, GetStudentsTablePayload>({
      query: () => `students/table`,
    }),
    GetStudentsStatuses: builder.query<GetStudentsStatusesResponse, GetStudentsStatusesPayload>({
      query: ({ userId }) => `students/${userId}`,
    }),
    Comment: builder.mutation<LeaveCommentProgressResponse, LeaveCommentProgressPayload>({
      query: ({ text, internshipProgressId }) => ({
        url: `internship/${internshipProgressId}`,
        method: 'POST',
        body: text,
      }),
    }),
  }),
})

export const {
  useCreateCompanyMutation,
  useCommentMutation,
  useExportStudentTableQuery,
  useGetStudentsParametersQuery,
  useGetStudentsStatusesQuery,
} = internshipAdminApi
