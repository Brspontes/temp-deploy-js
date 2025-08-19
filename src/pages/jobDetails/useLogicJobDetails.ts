import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useJobDetails from '@/hooks/useJobDetails'

type ActiveTab = 'meu-anuncio' | 'controlo'

export default function useLogicJobDetails() {
    const { jobId, companyId } = useParams()
    const navigate = useNavigate()
    const { data } = useJobDetails(jobId || '', companyId || '', true)
    const [isExpanded, setIsExpanded] = useState(false)
    const [activeTab, setActiveTab] = useState<ActiveTab>('meu-anuncio')

    const handleGoBack = () => {
        navigate('/home/jobs/open-jobs')
    }

    const toggleDescription = () => {
        setIsExpanded(!isExpanded)
    }

    const handleControlClick = () => {
        setActiveTab('controlo')
        navigate(`/home/jobs/controlo/${jobId}/${companyId}`)
    }

    const handleMyAdClick = () => {
        setActiveTab('meu-anuncio')
    }

    const handleCandidatesClick = () => {
        navigate(`/home/jobs/aprovacao-candidatos/${jobId}/${companyId}`)
    }

    return {
        data,
        isExpanded,
        activeTab,
        handleGoBack,
        toggleDescription,
        handleControlClick,
        handleMyAdClick,
        handleCandidatesClick
    }
}