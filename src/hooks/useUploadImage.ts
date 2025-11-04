import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { getCredentials } from '@/utils/util'

const baseUrl = import.meta.env.VITE_API

interface IPostForm {
  job: IUpdateJobPayload
  jobImage: File | null | undefined
  imageName: string | undefined
}

interface IUpdateJobForm {
  job: IUpdateJobPayload
  jobImage?: File | null
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

const extractJobIds = (data: any): string[] => {
  if (Array.isArray(data)) {
    if (typeof data[0] === 'string') {
      return data.filter(Boolean)
    }
    return data.map((job: any) => job.jobId || job.id).filter(Boolean)
  }

  if (typeof data === 'string') {
    return data.split(',').map((id: string) => id.trim()).filter(Boolean)
  }

  if (data.jobId) {
    return [data.jobId]
  }

  if (data.id) {
    return [data.id]
  }

  if (typeof data === 'object' && data.jobIds) {
    return Array.isArray(data.jobIds) ? data.jobIds : [data.jobIds]
  }

  return []
}

const uploadingJobIds = new Set<string>()

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

      const jobIds = extractJobIds(result.data)

      const uploadPromises = jobIds
        .filter((jobId) => {
          if (uploadingJobIds.has(jobId)) {
            return false
          }
          uploadingJobIds.add(jobId)
          return true
        })
        .map(async (jobId) => {
          try {
            const payload = new FormData()
            payload.append('file', jobImage, imageName)

            const uploadUrl = `${baseUrl}/v2/job/${jobId}/image`

            const response = await axios.post(uploadUrl, payload, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
              maxBodyLength: Infinity,
            })

            return response
          } finally {
            uploadingJobIds.delete(jobId)
          }
        })

      await Promise.all(uploadPromises)
    } catch (uploadError) {
      console.error('❌ Erro no upload da imagem (job criado com sucesso):', uploadError)
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
      const jobIds = extractJobIds(result.data)

      const uploadPromises = jobIds
        .filter((jobId) => {
          if (uploadingJobIds.has(jobId)) {
            return false
          }
          uploadingJobIds.add(jobId)
          return true
        })
        .map(async (jobId) => {
          try {
            const payload = new FormData()
            payload.append('file', jobImage, imageName)

            const uploadUrl = `${baseUrl}/v2/job/${jobId}/image`

            const response = await axios.post(uploadUrl, payload, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
              maxBodyLength: Infinity,
            })

            return response
          } finally {
            uploadingJobIds.delete(jobId)
          }
        })

      await Promise.all(uploadPromises)
    } catch (uploadError) {
      console.error('❌ Erro no upload da imagem (job atualizado com sucesso):', uploadError)
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
