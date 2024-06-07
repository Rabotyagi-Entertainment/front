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
  StudentsFileUploadPayload,
  StudentsFileUploadResponse,
} from './AuthDataSource.ts'
import { baseUrl } from '../static/authConfig.ts'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}api/auth/`,
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
      }),
    }),
    GetStudents: builder.query<GetLoadedStudentsResponse, GetLoadedStudentsPayload>({
      query: () => `students/table`,
    }),
  }),
})

export const {
  useGetStudentsQuery,
  useGetProfileQuery,
  useLoadStudentsMutation,
  useRegisterMutation,
  useLoginMutation,
} = authApi
