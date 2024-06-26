import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {
  GetLoadedStudentsPayload,
  GetLoadedStudentsResponse,
  LoginPayload,
  LoginResponse,
  ProfilePayload,
  ProfileResponse,
  RegisterPayload,
  RegisterResponse,
  SendMessageDeadlinePayload,
  SendMessageDeadlineResponse,
  StudentsFileUploadPayload,
  StudentsFileUploadResponse,
} from './AuthDataSource.ts'
import { baseUrl } from '../static/authConfig.ts'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}api/auth/`,
    prepareHeaders: headers => {
      const token = localStorage.getItem('userToken')

      if (token && !headers.has('Authorization')) {
        headers.set('Authorization', `Bearer ${token!}`)
      }

      return headers
    },
  }),
  endpoints: builder => ({
    Register: builder.mutation<RegisterResponse, RegisterPayload>({
      query: data => ({
        url: `register`,
        method: 'POST',
        body: data,
      }),
    }),
    Login: builder.mutation<LoginResponse, LoginPayload>({
      query: data => ({
        url: `login`,
        method: 'POST',
        body: data,
      }),
    }),
    GetProfile: builder.query<ProfileResponse, ProfilePayload>({
      query: () => `profile`,
    }),
    LoadStudents: builder.mutation<StudentsFileUploadResponse, StudentsFileUploadPayload>({
      query: data => ({
        url: `students/table`,
        method: 'POST',
        body: data,
        headers: {
          accept: '*/*',
          'Content-Type': 'multipart/form-data',
          Referer: 'http://localhost:5173/admin/lists',
          Origin: 'http://localhost:5173',
        },
      }),
    }),
    GetStudents: builder.query<GetLoadedStudentsResponse, GetLoadedStudentsPayload>({
      query: _ => `students/table`,
    }),
    SendDeadlineMessage: builder.mutation<SendMessageDeadlineResponse, SendMessageDeadlinePayload>({
      query: body => ({
        url: `deadline/message`,
        body: body,
        method: 'POST',
      }),
    }),
  }),
})

export const {
  useGetStudentsQuery,
  useGetProfileQuery,
  useLoadStudentsMutation,
  useRegisterMutation,
  useLoginMutation,
  useSendDeadlineMessageMutation,
} = authApi
