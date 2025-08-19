export interface WorkerDto {
    workerId: string
    workerName: string
    workerProfileId: string
    workerImage: string
    jobId: string
    jobPostJobId: string
    jobPeriodId?: string
    jobEventStartDate: string
    jobEventFinishDate: string
    candidatureStatus: 'PENDING' | 'APPROVED' | 'REFUSED'
}

export interface CandidaturesResponseDto {
    pendingCandidates: WorkerDto[]
    approvedCandidates: WorkerDto[]
    refusedCandidates: WorkerDto[]
}

export interface ApproveCandidaturesRequest {
    candidatureIds: string[]
}
