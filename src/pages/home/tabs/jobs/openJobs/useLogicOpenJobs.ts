import { useState, useMemo } from 'react'
import useJobList from '@/hooks/useJobList'

export const useLogicOpenJobs = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const pageSize = 6

    const { data, isSuccess, isFetching } = useJobList()

    const jobs = useMemo(() => {
        if (!data) return []
        if (Array.isArray(data)) return data

        if (typeof data === 'object') {
            const dataObj = data as any

            const possibleArrayKeys = ['jobs', 'jobResumeCompany', 'data', 'items', 'results']

            for (const key of possibleArrayKeys) {
                if (dataObj[key] && Array.isArray(dataObj[key])) {
                    return dataObj[key]
                }
            }

            for (const key in dataObj) {
                if (Array.isArray(dataObj[key])) {
                    return dataObj[key]
                }
            }
        }

        return []
    }, [data])

    const totalItems = jobs.length

    const paginatedData = useMemo(() => {
        const startIndex = (currentPage - 1) * pageSize
        const endIndex = startIndex + pageSize
        return jobs.slice(startIndex, endIndex)
    }, [jobs, currentPage, pageSize])

    const handlePageChange = (page: number) => {
        setCurrentPage(page)
    }

    return {
        currentPage,
        pageSize,

        jobs,
        totalItems,
        paginatedData,

        isSuccess,
        isFetching,

        handlePageChange,
    }
}

export default useLogicOpenJobs
