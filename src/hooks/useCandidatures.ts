import { useState, useEffect, useCallback } from 'react'
import { candidatureService } from '../services/service'
import { WorkerDto } from '../dtos/candidature.interface'

export interface UseCandidaturesReturn {
    candidatesPending: WorkerDto[]
    candidatesApproved: WorkerDto[]
    candidatesRejected: WorkerDto[]
    loading: boolean
    error: string | null
    refetch: () => void
    updateCandidatureStatus: (workerId: string, status: 'APPROVED' | 'REFUSED') => Promise<void>
    approveCandidatures: (candidatureIds: string[]) => Promise<void>
    approveCandidate: (candidateId: string) => Promise<void>
    refuseCandidature: (workerId: string, jobPeriodId: string) => Promise<void>
}

export const useCandidatures = (jobId: string, companyId: string): UseCandidaturesReturn => {
    const [candidatesPending, setCandidatesPending] = useState<WorkerDto[]>([])
    const [candidatesApproved, setCandidatesApproved] = useState<WorkerDto[]>([])
    const [candidatesRejected, setCandidatesRejected] = useState<WorkerDto[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchCandidatures = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await candidatureService.getCandidatures(jobId, companyId)

            setCandidatesPending(data.pendingCandidates || [])
            setCandidatesApproved(data.approvedCandidates || [])
            setCandidatesRejected(data.refusedCandidates || [])
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido')
        } finally {
            setLoading(false)
        }
    }, [jobId, companyId])

    const updateCandidatureStatus = async (workerId: string, status: 'APPROVED' | 'REFUSED') => {
        try {
            await candidatureService.updateCandidatureStatus(jobId, companyId, workerId, status)

            const candidate = candidatesPending.find(c => c.workerId === workerId) ||
                candidatesApproved.find(c => c.workerId === workerId)

            if (candidate) {
                setCandidatesPending(prev => prev.filter(c => c.workerId !== workerId))
                setCandidatesApproved(prev => prev.filter(c => c.workerId !== workerId))
                setCandidatesRejected(prev => prev.filter(c => c.workerId !== workerId))

                const updatedCandidate = { ...candidate, candidatureStatus: status }
                if (status === 'APPROVED') {
                    setCandidatesApproved(prev => [...prev, updatedCandidate])
                } else {
                    setCandidatesRejected(prev => [...prev, updatedCandidate])
                }
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao atualizar candidatura')
            throw err
        }
    }

    const approveCandidatures = async (candidatureIds: string[]) => {
        try {
            await candidatureService.approveCandidatures(companyId, candidatureIds)

            const candidatesToMove = candidatesPending.filter(c => candidatureIds.includes(c.workerId))

            setCandidatesPending(prev => prev.filter(c => !candidatureIds.includes(c.workerId)))
            setCandidatesApproved(prev => [
                ...prev,
                ...candidatesToMove.map(c => ({ ...c, candidatureStatus: 'APPROVED' as const }))
            ])
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao aprovar candidaturas')
            throw err
        }
    }

    const approveCandidate = async (candidateId: string) => {
        return approveCandidatures([candidateId])
    }

    const refuseCandidature = async (workerId: string, jobPeriodId: string) => {
        try {
            await candidatureService.refuseCandidature(jobId, jobPeriodId, workerId)

            const candidate = candidatesPending.find(c => c.workerId === workerId) ||
                candidatesApproved.find(c => c.workerId === workerId)

            if (candidate) {
                setCandidatesPending(prev => prev.filter(c => c.workerId !== workerId))
                setCandidatesApproved(prev => prev.filter(c => c.workerId !== workerId))

                const updatedCandidate = { ...candidate, candidatureStatus: 'REFUSED' as const }
                setCandidatesRejected(prev => [...prev, updatedCandidate])
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Erro ao recusar candidatura')
            throw err
        }
    }

    const refetch = () => {
        fetchCandidatures()
    }

    useEffect(() => {
        if (jobId && companyId) {
            fetchCandidatures()
        }
    }, [jobId, companyId, fetchCandidatures])

    return {
        candidatesPending,
        candidatesApproved,
        candidatesRejected,
        loading,
        error,
        refetch,
        updateCandidatureStatus,
        approveCandidatures,
        approveCandidate,
        refuseCandidature
    }
}
