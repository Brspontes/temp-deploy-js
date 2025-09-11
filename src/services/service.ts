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

export const profileService = {
    async getCompanyProfile(companyId: string) {
        try {
            const { token } = getCredentials()

            const response = await axios.get(
                `${baseUrl}/companies/${companyId}/profile`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            )

            return response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message ||
                    `Erro ao buscar dados do perfil: ${error.response?.status}`
                throw new Error(errorMessage)
            }
            throw new Error('Erro inesperado ao buscar dados do perfil')
        }
    },

    async uploadProfileImage(file: File): Promise<string> {
        try {
            const { token } = getCredentials()

            const formData = new FormData()
            formData.append('file', file)

            const response = await axios.put(
                `${baseUrl}/companies/profile/picture`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )

            return response.data.profilePicture || response.data.imageUrl || response.data.url || response.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message ||
                    `Erro ao fazer upload da imagem: ${error.response?.status}`
                throw new Error(errorMessage)
            }
            throw new Error('Erro inesperado ao fazer upload da imagem')
        }
    },

    async updateProfile(profileData: {
        name?: string
        email?: string
        phone?: string
        countryCode?: string
        instagram?: string
        facebook?: string
        linkedin?: string
        description?: string
        personalId?: string
        personalIdValidity?: string
        nif?: string
    }) {
        try {
            const { token, companyId } = getCredentials()

            const requestBody = {
                companyProfileInfo: {
                    idUserLogin: companyId,
                    ...(profileData.name && { name: profileData.name }),
                    ...(profileData.countryCode && { countryCode: profileData.countryCode }),
                    ...(profileData.phone && { phoneNumber: profileData.phone }),
                    ...(profileData.instagram && { instagramLink: profileData.instagram }),
                    ...(profileData.facebook && { facebookLink: profileData.facebook }),
                    ...(profileData.linkedin && { linkedinLink: profileData.linkedin }),
                    ...(profileData.description && { description: profileData.description }),
                },
                companyLegalInformation: {
                    idUserLogin: companyId,
                    ...(profileData.personalId && { personalId: profileData.personalId }),
                    ...(profileData.personalIdValidity && { personalIdValidyt: profileData.personalIdValidity }),
                    ...(profileData.nif && { nif: profileData.nif }),
                }
            }

            const response = await axios.put(
                `${baseUrl}/companies/profile`,
                requestBody,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            )

            return response.data
        } catch (error) {
            console.error('Erro ao atualizar perfil:', error)
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message ||
                    `Erro ao atualizar perfil: ${error.response?.status}`
                throw new Error(errorMessage)
            }
            throw new Error('Erro inesperado ao atualizar perfil')
        }
    },
}