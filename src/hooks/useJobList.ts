import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { IShortJobDto } from '@/dtos/shortJob.interface'
import { getCredentials } from '@/utils/util'

const baseUrl = import.meta.env.VITE_API

const getShortJob = async () => {
  const { token } = getCredentials()
  const result = await axios.get<IShortJobDto[]>(
    `${baseUrl}/v2/job/all/company/open`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  )
  return result.data
}

export function useJobList() {
  const query = useQuery({
    queryKey: ['shortjob'],
    queryFn: getShortJob
  })
  return query
}

export default useJobList
