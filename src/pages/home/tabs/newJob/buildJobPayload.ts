import { FormValues } from '@/domain/interfaces/newJob.interface'

interface EventDatesHour {
    eventStartDateHour: import('dayjs').Dayjs
    eventFinishDateHour: import('dayjs').Dayjs
}

interface NewJobPayload {
    title: string
    client: string
    eventDates: Array<{
        eventStartDateHour: string
        eventFinishDateHour: string
    }>
    location: string
    region: string
    jobFunction: string
    totalSalary: number
    paymentType: string
    currency: string
    description: string
    isActive: boolean
    isFinished: boolean
    people: {
        women: number
        men: number
        both: number
    }
    peopleWear: {
        menTshirt: string
        menPants: string
        womenTshirt: string
        womenPants: string
        menShoes: string
        womenShoes: string
    }
    publishTo: string
    questionnaire: string[]
}

export const buildJobPayload = (
    form: FormValues,
    eventDates: EventDatesHour[]
): NewJobPayload => {
    return {
        title: form.title,
        client: form.client,
        eventDates: eventDates.map((date) => ({
            eventStartDateHour: date.eventStartDateHour.toISOString(),
            eventFinishDateHour: date.eventFinishDateHour.toISOString(),
        })),
        location: form.location,
        region: form.region,
        jobFunction: form.jobFunction,
        totalSalary: Number(form.totalSalary),
        paymentType: 'Hour',
        currency: 'EUR',
        description: form.description,
        isActive: true,
        isFinished: false,
        people: {
            women: form.womens,
            men: form.mens,
            both: form.both,
        },
        peopleWear: {
            menTshirt: form.menTshirt,
            menPants: form.menPants,
            womenTshirt: form.womenTshirt,
            womenPants: form.womenPants,
            menShoes: form.menShoes,
            womenShoes: form.womenShoes,
        },
        publishTo: 'following',
        questionnaire: [],
    }
}
