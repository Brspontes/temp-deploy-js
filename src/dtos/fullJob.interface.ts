interface PeopleDto {
  women: number
  men: number
  both: number
}

interface JobImage {
  imagePath: string
}

interface PeopleWearDto {
  menTshirt: string
  menPants: string
  womenTshirt: string
  womenPants: string
  menShoes: string
  womenShoes: string
}

interface QuestionnaireDto {
  question: string
  questionId: string
}

export interface IFullJobDto {
  jobId: string
  companyName: string
  salary: number
  paymentType: string
  currency: string
  eventStartDateHour: string
  eventFinishDateHour: string
  location: string
  jobFunction: string
  people: PeopleDto
  image: JobImage
  client: string
  title: string
  region: string
  description: string
  isActive: boolean
  isFinished: boolean
  peopleWear: PeopleWearDto
  publishTo: string[]
  questionnaire: QuestionnaireDto[]
  companyEmail: string
  companyPicture: string
}
