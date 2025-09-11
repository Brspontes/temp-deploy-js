import { useMutation, useQuery } from '@tanstack/react-query';
import { message } from 'antd';
import { profileService } from '../services/service';
import { getCredentials } from '../utils/util';
import { CompanyProfileResponse } from '../dtos/companyProfile.interface';

export interface ProfileUpdateData {
    name?: string;
    email?: string;
    phone?: string;
    countryCode?: string;
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    description?: string;
    password?: string;
    personalId?: string;
    personalIdValidity?: string;
    nif?: string;
}

export function useProfileData() {
    const { companyId } = getCredentials();

    const query = useQuery<CompanyProfileResponse>({
        queryKey: ['companyProfile', companyId],
        queryFn: () => profileService.getCompanyProfile(companyId!),
        enabled: !!companyId,
        staleTime: 5 * 60 * 1000, // 5 minutos
    });

    return {
        profileData: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
    };
}

export function useProfileImageUpload() {
    const mutation = useMutation({
        mutationKey: ['uploadProfileImage'],
        mutationFn: (file: File) => profileService.uploadProfileImage(file),
        onSuccess: () => {
            message.success('Imagem de perfil atualizada com sucesso!')
        },
        onError: (error: Error) => {
            message.error(error.message || 'Erro ao fazer upload da imagem')
        },
    })

    return {
        uploadImage: mutation.mutate,
        isUploading: mutation.isPending,
        uploadError: mutation.error,
        imageUrl: mutation.data,
        reset: mutation.reset,
    }
}

export function useProfileUpdate() {
    const mutation = useMutation({
        mutationKey: ['updateProfile'],
        mutationFn: (profileData: ProfileUpdateData) => profileService.updateProfile(profileData),
        onSuccess: () => {
            message.success('Perfil atualizado com sucesso!')
        },
        onError: (error: Error) => {
            message.error(error.message || 'Erro ao atualizar perfil')
        },
    })

    return {
        updateProfile: mutation.mutate,
        isUpdating: mutation.isPending,
        updateError: mutation.error,
        isSuccess: mutation.isSuccess,
        data: mutation.data,
        reset: mutation.reset,
    }
}
