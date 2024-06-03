import { RolesEnum } from '../../types/user/RolesEnum.ts'
import { User } from '../../types/user/User.ts'

export interface RegisterPayload {
  email: string
  telegramUserName: string
  password: string
  fullName: string
}
export interface RegisterResponse {}

export interface LoginPayload {
  telegramUserName: string
  password: string
}
export interface LoginResponse {}

export interface ProfilePayload {}
export interface ProfileResponse {
  id: string
  fullName: string
  email: string
  telegramUserName: string
  joinedAt: string
  roles: RolesEnum[]
}

export interface StudentsListPayload {
  file: File
}
export interface StudentsListResponse {}

export interface GetLoadedStudentsPayload {}
type StudentsLists = User[]
export interface StudentsListResponse extends StudentsLists {}
