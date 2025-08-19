import axios from 'axios'
import { CandidaturesResponseDto } from '../dtos/candidature.interface'
import { getCredentials } from '../utils/util'

const baseUrl = import.meta.env.VITE_API

export const candidatureService = {
    async getCandidatures(jobId: string, companyId: string): Promise<CandidaturesResponseDto> {
        try {
            const { token } = getCredentials()
            const response = await axios.get<CandidaturesResponseDto>(
                `${baseUrl}/v2/job/${jobId}/company/${companyId}/candidatures`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Erro ao buscar candidaturas: ${error.response?.status}`)
            }
            throw error
        }
    },

    async updateCandidatureStatus(
        jobId: string,
        companyId: string,
        workerId: string,
        status: 'APPROVED' | 'REFUSED'
    ): Promise<void> {
        try {
            const { token } = getCredentials()
            await axios.put(
                `${baseUrl}/v2/job/${jobId}/company/${companyId}/candidature/${workerId}`,
                { status },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Erro ao atualizar status da candidatura: ${error.response?.status}`)
            }
            throw error
        }
    },

    async approveCandidatures(companyId: string, candidatureIds: string[]): Promise<void> {
        try {
            const { token } = getCredentials()
            await axios.post(
                `${baseUrl}/companies/${companyId}/candidatures/approve`,
                { candidatureIds },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Erro ao aprovar candidaturas: ${error.response?.status}`)
            }
            throw error
        }
    },

    async approveCandidate(companyId: string, candidateId: string): Promise<void> {
        return this.approveCandidatures(companyId, [candidateId])
    },

    async refuseCandidature(
        jobId: string,
        jobPeriodId: string,
        workerId: string
    ): Promise<void> {
        try {
            const { token } = getCredentials()
            await axios.delete(
                `${baseUrl}/v2/job/${jobId}/period/${jobPeriodId}/worker/${workerId}/refuse/candidature`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                }
            )
        } catch (error) {
            if (axios.isAxiosError(error)) {
                throw new Error(`Erro ao recusar candidatura: ${error.response?.status}`)
            }
            throw error
        }
    }
}