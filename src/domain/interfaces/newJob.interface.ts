import { Dayjs } from 'dayjs'

export interface EventDatesHour {
  eventStartDateHour: Dayjs
  eventFinishDateHour: Dayjs
  totalSalary: number
  paymentType: string
  currency: string
}

export interface FormValues {
  title: string
  client: string
  location: string
  region: string
  jobFunction: string
  totalSalary: number
  description: string
  womens: number
  mens: number
  both: number
  womenTshirt: string
  menTshirt: string
  womenPants: string
  menPants: string
  womenShoes: string
  menShoes: string
  eventDates: EventDatesHour[]
}
