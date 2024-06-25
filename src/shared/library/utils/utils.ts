import { DiaryTypeEnum } from '../../types/diary/DiaryTypeEnum.ts'
import { InternshipProgressEnum } from '../../types/internshipProgress/InternshipProgressEnum.ts'
import { DiaryStateTypeEnum } from '../../types/diary/DiaryStateTypeEnum.ts'

export const DiaryStatusMapper = {
  [DiaryStateTypeEnum.DRAFT]: { text: 'Черновик', color: 'gray' },
  [DiaryStateTypeEnum.ON_MENTOR_CHECK]: { text: 'На проверке у научного руководителя', color: 'yellow' },
  [DiaryStateTypeEnum.MENTOR_APPROVED]: { text: 'Научный руководитель одобрил', color: 'orange' },
  [DiaryStateTypeEnum.ON_DEAN_CHECK]: { text: 'На проверке у деканата', color: 'violet' },
  [DiaryStateTypeEnum.DEAN_APPROVED]: { text: 'Деканат одобрил', color: 'lightBlue' },
  [DiaryStateTypeEnum.ON_COMPANY_CHECK]: { text: 'На проверке у компании', color: 'blue' },
  [DiaryStateTypeEnum.ON_DEAN_SIGNATURE]: { text: 'На подписи у деканата', color: 'geekBlue' },
  [DiaryStateTypeEnum.DONE]: { text: 'Завершено', color: 'green' },
}
export const WorkModeMapper = {
  [DiaryTypeEnum.DEFAULT]: 'Обычный дневник',
  [DiaryTypeEnum.COURSE]: 'Курсовая',
  [DiaryTypeEnum.GRADUATION]: 'Диплом',
}

export const statusInternshipProgressMapper = {
  [InternshipProgressEnum.DEFAULT]: { text: 'Не начат', color: 'gray' },
  [InternshipProgressEnum.SUBMITTED_RESUME]: { text: 'Отправил резюме', color: 'yellow' },
  [InternshipProgressEnum.IN_SELECTION_PROGRESS]: { text: 'Отказ', color: 'orange' },
  [InternshipProgressEnum.RECEIVED_OFFER]: { text: 'Собеседование', color: 'blue' },
  [InternshipProgressEnum.REJECT]: { text: 'Отказ', color: 'red' },
  [InternshipProgressEnum.ACCEPT_OFFER]: { text: 'Получил оффер', color: 'green' },
}
