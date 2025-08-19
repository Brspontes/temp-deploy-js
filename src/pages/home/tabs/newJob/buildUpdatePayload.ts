import { FormValues } from '@/domain/interfaces/newJob.interface'
import { getCredentials } from '@/utils/util'

interface EventDatesHour {
    eventStartDateHour: import('dayjs').Dayjs
    eventFinishDateHour: import('dayjs').Dayjs
}

interface UpdateJobPayload {
    jobId: string
    companyEmail: string
    companyName: string
    title: string
    client: string
    eventDates: string[]
    location: string
    region: string
    jobFunction: string
    salary: number
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
    questionnaire?: string[]
}

export const buildUpdatePayload = (
    form: FormValues,
    eventDates: EventDatesHour[],
    jobId?: string,
    companyName?: string
): UpdateJobPayload => {
    const { email } = getCredentials()

    return {
        jobId: jobId || '',
        companyEmail: email || '',
        companyName: companyName || '',
        title: form.title,
        client: form.client,
        eventDates: eventDates.map((date) => date.eventStartDateHour.toISOString()),
        location: form.location,
        region: form.region,
        jobFunction: form.jobFunction,
        salary: Number(form.totalSalary),
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
