import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import useJobDetails from '@/hooks/useJobDetails'

type ActiveTab = 'meu-anuncio' | 'controlo'

export default function useLogicJobControl() {
    const { jobId, companyId } = useParams()
    const navigate = useNavigate()
    const { data } = useJobDetails(jobId || '', companyId || '', true)
    const [activeTab, setActiveTab] = useState<ActiveTab>('controlo')

    const handleGoBack = () => {
        navigate('/home/jobs/open-jobs')
    }

    const handleControlClick = () => {
        setActiveTab('controlo')
    }

    const handleMyAdClick = () => {
        setActiveTab('meu-anuncio')
        navigate(`/home/jobs/open-jobs/${jobId}/${companyId}`)
    }

    const handleCandidatesClick = () => {
        navigate(`/home/jobs/aprovacao-candidatos/${jobId}/${companyId}`)
    }

    const handleEditClick = () => {
        console.log('Editar anúncio')
    }

    const handlePauseClick = () => {
        console.log('Pausar anúncio')
    }

    const handleDeleteClick = () => {
        console.log('Excluir anúncio')
    }

    const handleToggleActive = (checked: boolean) => {
        console.log('Toggle ativo:', checked)
    }

    return {
        data,
        activeTab,
        handleGoBack,
        handleControlClick,
        handleMyAdClick,
        handleCandidatesClick,
        handleEditClick,
        handlePauseClick,
        handleDeleteClick,
        handleToggleActive
    }
}
