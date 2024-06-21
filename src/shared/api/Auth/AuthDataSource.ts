import { RolesEnum } from '../../types/user/RolesEnum.ts'
import { User } from '../../types/user/User.ts'

export interface RegisterPayload {
  email: string
  telegramUserName: string
  password: string
  fullName: string
}
export interface RegisterResponse {
  jwt: string
}

export interface LoginPayload {
  telegramUserName: string
  password: string
}
export interface LoginResponse {
  jwt: string
}

export interface ProfilePayload {}
export interface ProfileResponse {
  id: string
  fullName: string
  email: string
  telegramUserName: string
  joinedAt: string
  roles: RolesEnum
}

export interface StudentsFileUploadPayload {
  file: File
}
export interface StudentsFileUploadResponse {}

export interface GetLoadedStudentsPayload {}
export type GetLoadedStudentsResponse = User[]
