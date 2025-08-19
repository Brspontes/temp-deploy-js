interface PeopleDto {
  women: number
  men: number
  both?: number
  unisex?: number
}

interface SalaryDto {
  [key: string]: any
}

interface PeopleWearDto {
  menTshirt: string
  menPants: string
  womenTshirt: string
  womenPants: string
  menShoes: string
  womenShoes: string
}

interface CandidatesDetailsDto {
  totalCandidates: number
  totalApproved: number
  totalRefused: number
}

interface EventDateDto {
  id: string
  jobId: string
  startDate: string
  finishDate: string
  menQuantity: number
  womenQuantity: number
  menWomenQuantity: number
  createdAt: string
  updatedAt: string
}

export interface IFullJobDto {
  jobId: string
  jobPeriodId?: string
  companyId: string
  companyName: string
  companyAnnouncimentsQuantity?: number
  companyLocation: string
  salary: SalaryDto
  totalSalary: SalaryDto
  paymentType: string
  currency: string
  eventStartDateHour?: string
  eventFinishDateHour?: string
  eventDates?: EventDateDto[]
  location: string
  jobFunction: string
  people: PeopleDto
  image: string
  client: string
  title: string
  region: string
  description: string
  isActive: boolean
  isFinished: boolean
  peopleWear: PeopleWearDto
  publishTo: string
  questionnaire: string[]
  companyEmail: string
  companyPicture: string
  isFollowing?: boolean
  isFavorite?: boolean
  isEnroled?: boolean
  candidatesDetails: CandidatesDetailsDto
}
