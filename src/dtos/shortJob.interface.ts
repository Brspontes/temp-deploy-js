interface People {
  women: number
  men: number
  unisex: number
}

export interface IShortJobDto {
  jobId: string
  jobPeriodId: string
  companyId: string
  title: string
  jobFunction: string
  people: People
  image: string
  client: string
}
