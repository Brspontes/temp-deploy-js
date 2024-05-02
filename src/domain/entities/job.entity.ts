export interface IJob {
  title?: string
  client?: string
  eventStartDateHour?: Date
  location?: string
  region?: string
  publishTo?: string
  jobFunction?: string
  salary?: number
  description?: string
  people?: People
  peopleWear?: PeopleWear
}

interface IPeople {
  women: number
  men: number
  both: number
}

export class People implements IPeople {
  constructor(girls: number, boys: number, both: number) {
    this.women = girls
    this.men = boys
    this.both = both
  }
  women: number
  men: number
  both: number
}

interface IPeopleWear {
  menTshirt: string
  menPants: string
  womenTshirt: string
  womenPants: string
  menShoes: string
  womenShoes: string
}

export class PeopleWear implements IPeopleWear {
  constructor(
    menTshirt: string,
    menPants: string,
    womenTshirt: string,
    womenPants: string,
    menShoes: string,
    womenShoes: string,
  ) {
    this.menTshirt = menTshirt
    this.menPants = menPants
    this.womenTshirt = womenTshirt
    this.womenPants = womenPants
    this.menShoes = menShoes
    this.womenShoes = womenShoes
  }
  menTshirt: string
  menPants: string
  womenTshirt: string
  womenPants: string
  menShoes: string
  womenShoes: string
}

export class Job implements IJob {
  title: string
  client: string
  eventStartDateHour: Date
  eventFinishDateHour: Date
  location: string
  region: string
  jobFunction: string
  salary: number
  paymentType: string
  currency: string
  description: string
  isActive: boolean
  isFinished: boolean
  people: People
  peopleWear: PeopleWear
  publishTo: string

  constructor(
    title: string,
    client: string,
    eventStartDateHour: Date,
    eventFinishDateHour: Date,
    location: string,
    region: string,
    jobFunction: string,
    salary: number,
    paymentType: string,
    currency: string,
    description: string,
    isActive: boolean,
    isFinished: boolean,
    people: People,
    peopleWear: PeopleWear,
    publishTo: string,
  ) {
    this.title = title
    this.client = client
    this.eventStartDateHour = eventStartDateHour
    this.eventFinishDateHour = eventFinishDateHour
    this.location = location
    this.region = region
    this.jobFunction = jobFunction
    this.salary = salary
    this.paymentType = paymentType
    this.currency = currency
    this.description = description
    this.isActive = isActive
    this.isFinished = isFinished
    this.people = people
    this.peopleWear = peopleWear
    this.publishTo = publishTo
  }
}
