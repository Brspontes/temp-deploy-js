export interface IJob {
  title?: string
  client?: string
  eventDates?: EventDates[]
  location?: string
  region?: string
  publishTo?: string
  jobFunction?: string
  totalSalary?: number
  description?: string
  people?: People
  peopleWear?: PeopleWear
}

export interface IPeople {
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

export class EventDates {
  constructor(eventStartDateHour: Date, eventFinishDateHour: Date) {
    this.eventStartDateHour = eventStartDateHour
    this.eventFinishDateHour = eventFinishDateHour
  }
  eventStartDateHour: Date
  eventFinishDateHour: Date
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
  eventDates: EventDates[]
  location: string
  region: string
  jobFunction: string
  totalSalary: number
  paymentType: string
  currency: string
  description: string
  isActive: boolean
  isFinished: boolean
  people: People
  peopleWear: PeopleWear
  publishTo: string

  constructor({
    title,
    client,
    eventDates,
    location,
    region,
    jobFunction,
    totalSalary,
    paymentType,
    currency,
    description,
    isActive,
    isFinished,
    people,
    peopleWear,
    publishTo,
  }: {
    title: string
    client: string
    eventDates: EventDates[]
    location: string
    region: string
    jobFunction: string
    totalSalary: number
    paymentType: string
    currency: string
    description: string
    isActive: boolean
    isFinished: boolean
    people: People
    peopleWear: PeopleWear
    publishTo: string
  }) {
    this.title = title
    this.client = client
    this.eventDates = eventDates
    this.location = location
    this.region = region
    this.jobFunction = jobFunction
    this.totalSalary = totalSalary
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
