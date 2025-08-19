import { useMutation } from '@tanstack/react-query'
import { IRegister, IRegisterResponse } from '@/dtos/register.interface'
import axios, { AxiosPromise } from 'axios'
import { toast } from 'react-toastify'
import { systemMessage } from '@/utils/message'
import { toastErrorConfig } from '@/utils/util'

const baseUrl = import.meta.env.VITE_API

const userRegisterAsync = async (data: IRegister): AxiosPromise<IRegisterResponse> => {
    try {
        const response = await axios.post<IRegisterResponse>(
            `${baseUrl}/companies/create`,
            data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
        return response
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Detalhes do erro:', error.response?.data)
            console.error('Status do erro:', error.response?.status)
        }
        throw error
    }
}

export function useToDoRegister() {
    const mutate = useMutation({
        mutationFn: userRegisterAsync,
        onError: (error: any) => {
            if (axios.isAxiosError(error)) {
                const status = error.response?.status
                const errorKey = error.response?.data?.errorKey

                if (status === 409 && errorKey === 'USER_ALREADY_EXISTS') {
                    toast(systemMessage.register.userAlreadyExists, toastErrorConfig)
                } else {
                    toast(systemMessage.register.errorRegister, toastErrorConfig)
                }
            } else {
                toast(systemMessage.register.errorRegister, toastErrorConfig)
            }
        }
    })

    return mutate
}