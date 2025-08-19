import { ToastOptions } from 'react-toastify'

export const toastSucessConfig: ToastOptions = {
  autoClose: 3000,
  position: 'top-right',
  closeOnClick: true,
  theme: 'colored',
  type: 'success',
}

export const toastErrorConfig: ToastOptions = {
  autoClose: 3000,
  position: 'top-right',
  closeOnClick: true,
  theme: 'colored',
  type: 'error',
}

export const getCredentials = () => {
  const token = localStorage.getItem('token')
  const refreshToken = localStorage.getItem('refreshToken')
  const email = localStorage.getItem('email')
  const companyId = localStorage.getItem('companyId')

  return {
    token,
    refreshToken,
    email,
    companyId,
  }
}

const unauthorizedCodes = ['401', '403']
export const isUnauthorized = (message: string) =>
  unauthorizedCodes.some((code) => message.includes(code))

export const isAuthenticated = () => {
  const { token, refreshToken, email } = getCredentials()
  return token && refreshToken && email
}
