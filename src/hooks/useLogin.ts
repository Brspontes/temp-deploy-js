import { useMutation } from '@tanstack/react-query'
import { ILogin, ILoginResponse } from '@/dtos/login.interface'
import axios, { AxiosError, AxiosPromise } from 'axios'
import { toast } from 'react-toastify'
import { toastErrorConfig } from '@/utils/util'
import { useNavigate } from 'react-router-dom'

const baseUrl = import.meta.env.VITE_API

const userLoginAsync = async (data: ILogin): AxiosPromise<ILoginResponse> => {
  const response = await axios.post<ILoginResponse>(
    `${baseUrl}/authorization/login`,
    data,
  )
  return response
}

export function useToDoLogin() {
  const navigate = useNavigate()

  const mutate = useMutation({
    mutationFn: userLoginAsync,
    onSuccess: (data) => {
      localStorage.setItem('token', data.data.token)
      localStorage.setItem('refreshToken', data.data.refreshToken)
      localStorage.setItem('email', data.data.email)
      localStorage.setItem('companyId', data.data.idUser)
      navigate('/home')
    },
    onError: (error: AxiosError<any>, variables) => {
      error.config = { ...error.config, skipGlobalErrorHandling: true } as any

      if (error.response?.status === 401) {
        const errorKey = error.response?.data?.errorKey

        if (errorKey === 'USER_IS_NOT_VERIFIED') {
          const email = variables.email
          navigate('/email-verification', {
            state: {
              email: email,
              fromLogin: true
            }
          })
        } else {
          toast('Email ou palavra-passe incorretos.', toastErrorConfig)
        }
      } else {
        toast('Erro ao fazer login. Tente novamente.', toastErrorConfig)
      }
    },
    meta: {
      skipGlobalErrorHandling: true
    }
  })

  return mutate
}
