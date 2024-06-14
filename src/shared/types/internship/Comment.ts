import { RolesEnum } from '../user/RolesEnum.ts'

export interface CommentType {
  text: string
  author: string
  roleType: RolesEnum
}
