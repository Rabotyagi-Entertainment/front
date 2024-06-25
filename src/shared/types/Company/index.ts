import { InternshipProgressEnum } from '../internshipProgress/InternshipProgressEnum.ts'

export type CurrentCompanyType = {
  id: string
  name: string
  startAt: string
  endAt: string
}

export type InternshipCompanyType = {
  id: string
  name: string
  status: InternshipProgressEnum
}
