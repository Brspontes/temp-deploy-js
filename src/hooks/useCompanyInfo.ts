import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import axios from 'axios'
import { getCredentials } from '@/utils/util'

const baseUrl = import.meta.env.VITE_API

interface CompanyInfo {
    companyId: string
    companyName: string
    email: string
}

const getCompanyInfo = async (): Promise<CompanyInfo> => {
    const { token, email } = getCredentials()
    const result = await axios.get<CompanyInfo>(
        `${baseUrl}/company/info?email=${email}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    )
    return result.data
}

export function useCompanyInfo() {
    const { companyId } = getCredentials()

    const query = useQuery({
        queryKey: ['companyInfo'],
        queryFn: getCompanyInfo,
        enabled: !companyId,
    })

    useEffect(() => {
        if (query.data?.companyId) {
            localStorage.setItem('companyId', query.data.companyId)
        }
    }, [query.data])

    return {
        ...query,
        companyId: companyId || query.data?.companyId
    }
}

export default useCompanyInfo
