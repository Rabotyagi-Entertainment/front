import { CurrentCompanyType, InternshipCompanyType } from '../Company'

export interface UserWithCompany {
  id: string
  name: string
  group: string
  companies: InternshipCompanyType[]
  currentCompany: CurrentCompanyType
}
