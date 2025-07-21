import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { IShortJobDto } from '../dtos/shortJob.interface'

const getShortJob = async () => {
  const email = localStorage.getItem('email')
  const result = await axios.get<IShortJobDto[]>(
    `https://service.ioapply.com/job/by-company?email=${email}&page=1`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    },
  )
  return result.data
}

export function useJobList() {
  const query = useQuery({ queryKey: ['shortjob'], queryFn: getShortJob })
  return query
}

export default useJobList
