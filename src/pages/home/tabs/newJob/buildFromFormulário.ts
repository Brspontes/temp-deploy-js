import {
  EventDates,
  Job,
  People,
  PeopleWear,
} from '@/domain/entities/job.entity'
import { FormValues } from '@/domain/interfaces/newJob.interface'

export default class buildFromFormulário {
  isValid: boolean
  errors: object
  job: Job | null

  constructor(form: FormValues) {
    this.isValid = true
    this.errors = {}
    this.job = null

    this.validar(form)
  }

  validar(form: FormValues) {
    const {
      eventDates,
      womenTshirt,
      menTshirt,
      womenPants,
      menPants,
      womenShoes,
      menShoes,
      womens,
      mens,
      both,
    } = form

    const peopleWear = new PeopleWear(
      menTshirt,
      menPants,
      womenTshirt,
      womenPants,
      menShoes,
      womenShoes,
    )
    const people = new People(womens, mens, both)

    console.log('event dates', eventDates)

    const job = new Job({
      title: form.title,
      client: form.client,
      eventDates: form.eventDates.map(
        (date) =>
          new EventDates(
            date.eventStartDateHour.toDate(),
            date.eventFinishDateHour.toDate(),
          ),
      ),
      isActive: true,
      isFinished: false,
      location: form.location,
      publishTo: 'all',
      description: form.description,
      people: people,
      peopleWear: peopleWear,
      region: form.region,
      totalSalary: Number(form.totalSalary),
      paymentType: 'Hour',
      jobFunction: form.jobFunction,
      currency: 'EUR',
    })

    this.job = job
  }
}
