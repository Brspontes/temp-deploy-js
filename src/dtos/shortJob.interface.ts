interface People {
  women: number
  men: number
  both: number
}

interface JobImage {
  imagePath: string
}

export interface IShortJobDto {
  jobId: string
  companyName: string
  companyEmail: string
  title: string
  salary: number
  paymentType: string
  currency: string
  eventStartDateHour: Date
  eventFinishDateHour: Date
  location: string
  jobFunction: string
  people: People
  image: JobImage
  client: string
  isFavorite: boolean
}
