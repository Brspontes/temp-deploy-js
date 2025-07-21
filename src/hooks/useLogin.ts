import { useMutation } from '@tanstack/react-query'
import { ILogin, ILoginResponse } from '../dtos/login.interface'
import axios, { AxiosPromise } from 'axios'

const userLoginAsync = async (data: ILogin): AxiosPromise<ILoginResponse> => {
  const response = await axios.post<ILoginResponse>(
    'https://service.ioapply.com/authorization/login',
    data,
  )
  return response
}

export function useToDoLogin() {
  const mutate = useMutation({
    mutationFn: userLoginAsync,
    onSuccess: (data) => {
      localStorage.setItem('token', data.data.token)
      localStorage.setItem('refreshToken', data.data.refreshToken)
      localStorage.setItem('email', data.data.email)
    },
  })

  return mutate
}
