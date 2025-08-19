import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { getCredentials } from '@/utils/util'

const baseUrl = import.meta.env.VITE_API

interface IPostForm {
  job: IUpdateJobPayload
  jobImage: Buffer | null | undefined
  imageName: string | undefined
}

interface IUpdateJobForm {
  job: IUpdateJobPayload
  jobImage?: Buffer | null
  imageName?: string
}

interface IUpdateJobPayload {
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

const postJobAsync = async ({
  job,
  jobImage,
  imageName,
}: IPostForm): Promise<void> => {
  const { token, companyId } = getCredentials()

  if (!companyId) {
    throw new Error('CompanyId não encontrado. Faça login novamente.')
  }

  const result = await axios.post(
    `${baseUrl}/v2/job/company/${companyId}`,
    job,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      maxBodyLength: Infinity,
    },
  )

  if (result.data && jobImage) {
    try {
      const jobId = result.data.jobId || result.data.id || result.data

      const payload = new FormData()
      const blob = new Blob([jobImage], { type: 'application/octet-stream' })
      payload.append('file', blob, imageName)

      await axios.post(`${baseUrl}/v2/job/${jobId}/image`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        maxBodyLength: Infinity,
      })
    } catch (uploadError) {
      console.warn('Erro no upload da imagem (job criado com sucesso):', uploadError)
    }
  }
}

const updateJobAsync = async ({
  job,
  jobImage,
  imageName,
}: IUpdateJobForm): Promise<void> => {
  const { token, companyId } = getCredentials()

  if (!companyId) {
    throw new Error('CompanyId não encontrado. Faça login novamente.')
  }

  const result = await axios.post(
    `${baseUrl}/v2/job/company/${companyId}`,
    job,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      maxBodyLength: Infinity,
    },
  )

  if (result.data && jobImage && imageName) {
    try {
      const jobId = result.data.jobId || result.data.id || result.data

      const payload = new FormData()
      const blob = new Blob([jobImage], { type: 'application/octet-stream' })
      payload.append('file', blob, imageName)

      await axios.post(`${baseUrl}/v2/job/${jobId}/image`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        maxBodyLength: Infinity,
      })
    } catch (uploadError) {
      console.warn('Erro no upload da imagem (job atualizado com sucesso):', uploadError)
    }
  }
}

export function usePostJob() {
  const mutate = useMutation({
    mutationKey: ['createNewJob'],
    mutationFn: postJobAsync,
  })

  return mutate
}

export function useUpdateJob() {
  const mutate = useMutation({
    mutationKey: ['updateJob'],
    mutationFn: updateJobAsync,
  })

  return mutate
}
