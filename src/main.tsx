import 'react-toastify/dist/ReactToastify.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.less'
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { RouterProvider } from 'react-router-dom'
import router from './../routes'
import { ToastContainer } from 'react-toastify'
import axios from 'axios'
import { isUnauthorized } from './utils/util'

const baseUrl = import.meta.env.VITE_API

const refreshToken = async () => {
  const data = await axios
    .post(`${baseUrl}/authorization/refresh-token`, {
      refreshToken: localStorage.getItem('refreshToken'),
    })
    .then((response) => response.data)
    .catch(() => {
      localStorage.clear()
      window.location.href = '/'
    })

  localStorage.setItem('token', data.token)
  localStorage.setItem('refreshToken', data.refreshToken)
  localStorage.setItem('email', data.userName)
}

const client = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      if (isUnauthorized(error.message)) {
        refreshToken().then(() => {
          query.fetch()
        })
      }
    },
  }),
  mutationCache: new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.meta?.skipGlobalErrorHandling) {
        return
      }
      
      if (isUnauthorized(error.message)) {
        refreshToken()
      }
    },
  }),
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastContainer />
    <QueryClientProvider client={client}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </QueryClientProvider>
  </React.StrictMode>,
)
