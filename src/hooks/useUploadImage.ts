import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { IJob } from '../domain/entities/job.entity'

interface IPostForm {
  job: IJob | null
  companyEmail: string
  jobImage: Buffer | null | undefined
  imageName: string | undefined
}

const postJobAsync = async ({
  job,
  companyEmail,
  jobImage,
  imageName,
}: IPostForm): Promise<void> => {
  const result = await axios.post(
    `http://service.ioapply.com/job/create/company/${companyEmail}`,
    job,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      maxBodyLength: Infinity,
    },
  )

  if (result.data && jobImage) {
    const payload = new FormData()
    const blob = new Blob([jobImage], { type: 'application/octet-stream' })
    payload.append('jobId', result.data.jobId)
    payload.append('file', blob, imageName)

    await axios.post(`http://service.ioapply.com/job/upload-picture`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      maxBodyLength: Infinity,
    })
  }
}

export function usePostJob() {
  const mutate = useMutation({
    mutationFn: postJobAsync,
  })

  return mutate
}
