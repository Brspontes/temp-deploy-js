import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { IFullJobDto } from '@/dtos/fullJob.interface'
import { getCredentials } from '@/utils/util'

const baseUrl = import.meta.env.VITE_API

const getJobDetails = async (jobId: string, companyId: string): Promise<IFullJobDto> => {
  const { token } = getCredentials()
  const result = await axios.get<IFullJobDto>(`${baseUrl}/v2/job/${jobId}/company/${companyId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return result.data
}

export function useJobDetails(jobId: string, companyId: string, isActive: boolean) {
  const query = useQuery({
    queryKey: ['jobDetails', jobId, companyId],
    queryFn: () => getJobDetails(jobId, companyId),
    enabled: isActive,
  })
  return query
}

export default useJobDetails
