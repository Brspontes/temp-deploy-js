import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { IFullJobDto } from '../dtos/fullJob.interface'

const getJobDetails = async (id: string): Promise<IFullJobDto> => {
  const result = await axios.get<IFullJobDto>(
    `https://service.ioapply.com/job/by-id/${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  )
  console.log(result.data)
  return result.data
}

export function useJobDetails(id: string, isActive: boolean) {
  const query = useQuery({
    queryKey: ['jobDetails', id],
    queryFn: () => getJobDetails(id),
    enabled: isActive,
  })
  return query
}

export default useJobDetails
