import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useCandidatures } from '../../../../../hooks/useCandidatures'
import { WorkerDto } from '../../../../../dtos/candidature.interface'

export interface Candidate {
    id: string
    name: string
    avatar: string
    profileId?: string
    startDate?: string
    finishDate?: string
    status?: string
    jobPeriodId?: string
}

export interface CandidateApprovalLogic {
    candidatesPending: Candidate[]
    candidatesApproved: Candidate[]
    candidatesRejected: Candidate[]

    selectedPending: string[]
    selectedApproved: string[]
    selectedRejected: string[]

    handlePendingSelection: (candidateId: string, checked: boolean) => void
    handleApprovedSelection: (candidateId: string, checked: boolean) => void
    handleRejectedSelection: (candidateId: string, checked: boolean) => void

    approveCandidate: (candidateId: string) => Promise<void>
    rejectCandidate: (candidateId: string, jobPeriodId?: string) => Promise<void>
    rejectApprovedCandidate: (candidateId: string, jobPeriodId?: string) => Promise<void>

    approveBatchCandidates: (candidateIds: string[]) => Promise<void>
    refuseCandidateWithPeriod: (candidateId: string, jobPeriodId: string) => Promise<void>

    approvePendingBatch: () => Promise<void>
    rejectPendingBatch: () => Promise<void>
    rejectApprovedBatch: () => Promise<void>

    loading: boolean
    error: string | null
    refetch: () => void
}

const mapWorkerToCandidate = (worker: WorkerDto): Candidate => ({
    id: worker.workerId,
    name: worker.workerName,
    avatar: worker.workerImage || 'https://i.pravatar.cc/150',
    profileId: worker.workerProfileId,
    startDate: worker.jobEventStartDate,
    finishDate: worker.jobEventFinishDate,
    status: worker.candidatureStatus,
    jobPeriodId: worker.jobPeriodId
})

export const useLogicCandidateApproval = (): CandidateApprovalLogic => {
    const { jobId, companyId } = useParams<{ jobId: string; companyId: string }>()

    const {
        candidatesPending: pendingWorkers,
        candidatesApproved: approvedWorkers,
        candidatesRejected: rejectedWorkers,
        loading,
        error,
        refetch,
        updateCandidatureStatus,
        approveCandidatures,
        approveCandidate: approveIndividualCandidate,
        refuseCandidature
    } = useCandidatures(jobId || '', companyId || '')

    const [selectedPending, setSelectedPending] = useState<string[]>([])
    const [selectedApproved, setSelectedApproved] = useState<string[]>([])
    const [selectedRejected, setSelectedRejected] = useState<string[]>([])

    const candidatesPending = pendingWorkers.map(mapWorkerToCandidate)
    const candidatesApproved = approvedWorkers.map(mapWorkerToCandidate)
    const candidatesRejected = rejectedWorkers.map(mapWorkerToCandidate)

    const handlePendingSelection = (candidateId: string, checked: boolean) => {
        setSelectedPending(prev =>
            checked
                ? [...prev, candidateId]
                : prev.filter(id => id !== candidateId)
        )
    }

    const handleApprovedSelection = (candidateId: string, checked: boolean) => {
        setSelectedApproved(prev =>
            checked
                ? [...prev, candidateId]
                : prev.filter(id => id !== candidateId)
        )
    }

    const handleRejectedSelection = (candidateId: string, checked: boolean) => {
        setSelectedRejected(prev =>
            checked
                ? [...prev, candidateId]
                : prev.filter(id => id !== candidateId)
        )
    }

    const approveCandidate = async (candidateId: string) => {
        try {
            await approveIndividualCandidate(candidateId)
            setSelectedPending(prev => prev.filter(id => id !== candidateId))
        } catch (error) {
            console.error('Erro ao aprovar candidato:', error)
        }
    }

    const rejectCandidate = async (candidateId: string, jobPeriodId?: string) => {
        try {
            if (jobPeriodId) {
                await refuseCandidature(candidateId, jobPeriodId)
            } else {
                await updateCandidatureStatus(candidateId, 'REFUSED')
            }
            setSelectedPending(prev => prev.filter(id => id !== candidateId))
        } catch (error) {
            console.error('Erro ao rejeitar candidato:', error)
        }
    }

    const rejectApprovedCandidate = async (candidateId: string, jobPeriodId?: string) => {
        try {
            if (jobPeriodId) {
                await refuseCandidature(candidateId, jobPeriodId)
            } else {
                await updateCandidatureStatus(candidateId, 'REFUSED')
            }
            setSelectedApproved(prev => prev.filter(id => id !== candidateId))
        } catch (error) {
            console.error('Erro ao rejeitar candidato aprovado:', error)
        }
    }

    const approveBatchCandidates = async (candidateIds: string[]) => {
        try {
            await approveCandidatures(candidateIds)
            setSelectedPending(prev => prev.filter(id => !candidateIds.includes(id)))
        } catch (error) {
            console.error('Erro ao aprovar candidatos em lote:', error)
        }
    }

    const refuseCandidateWithPeriod = async (candidateId: string, jobPeriodId: string) => {
        try {
            await refuseCandidature(candidateId, jobPeriodId)
            setSelectedPending(prev => prev.filter(id => id !== candidateId))
            setSelectedApproved(prev => prev.filter(id => id !== candidateId))
        } catch (error) {
            console.error('Erro ao recusar candidato:', error)
        }
    }

    const approvePendingBatch = async () => {
        if (selectedPending.length > 0) {
            await approveBatchCandidates(selectedPending)
        }
    }

    const rejectPendingBatch = async () => {
        if (selectedPending.length > 0) {
            for (const candidateId of selectedPending) {
                const candidate = candidatesPending.find(c => c.id === candidateId)
                if (candidate?.jobPeriodId) {
                    await refuseCandidateWithPeriod(candidateId, candidate.jobPeriodId)
                } else {
                    await rejectCandidate(candidateId)
                }
            }
            setSelectedPending([])
        }
    }

    const rejectApprovedBatch = async () => {
        if (selectedApproved.length > 0) {
            for (const candidateId of selectedApproved) {
                const candidate = candidatesApproved.find(c => c.id === candidateId)
                if (candidate?.jobPeriodId) {
                    await refuseCandidateWithPeriod(candidateId, candidate.jobPeriodId)
                } else {
                    await rejectApprovedCandidate(candidateId)
                }
            }
            setSelectedApproved([])
        }
    }

    return {
        candidatesPending,
        candidatesApproved,
        candidatesRejected,

        selectedPending,
        selectedApproved,
        selectedRejected,

        handlePendingSelection,
        handleApprovedSelection,
        handleRejectedSelection,

        approveCandidate,
        rejectCandidate,
        rejectApprovedCandidate,

        approveBatchCandidates,
        refuseCandidateWithPeriod,

        approvePendingBatch,
        rejectPendingBatch,
        rejectApprovedBatch,

        loading,
        error,
        refetch,
    }
}
