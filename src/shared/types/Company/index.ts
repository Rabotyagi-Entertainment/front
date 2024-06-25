import { Index } from '../internshipProgress'

export type CurrentCompanyType = {
  id: string
  name: string
  startAt: string
  endAt: string
}

export type InternshipCompanyType = {
  id: string
  name: string
  status: Index
}
