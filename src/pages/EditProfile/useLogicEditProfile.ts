import { useState, useEffect, useCallback } from 'react'
import { Form, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useProfileImageUpload, useProfileUpdate, useProfileData, ProfileUpdateData } from '../../hooks/useProfileUpload'

export const useLogicEditProfile = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [imageUrl, setImageUrl] = useState<string>()
    const [imageFile, setImageFile] = useState<File | null>(null)

    const {
        profileData,
        isLoading: isLoadingProfile,
        isError: isProfileError,
        error: profileError,
        refetch: refetchProfile
    } = useProfileData()

    const {
        uploadImage,
        isUploading,
        imageUrl: uploadedImageUrl,
        reset: resetImageUpload
    } = useProfileImageUpload()

    const {
        updateProfile,
        isUpdating,
        isSuccess: isUpdateSuccess,
        data: updateData,
        reset: resetProfileUpdate
    } = useProfileUpdate()

    const handleGoBack = useCallback(() => {
        resetImageUpload()
        resetProfileUpdate()
        navigate(-1)
    }, [resetImageUpload, resetProfileUpdate, navigate])

    useEffect(() => {
        if (profileData) {
            const formValues: any = {
                name: profileData.name || '',
                countryCode: profileData.countryCode || '',
                phone: profileData.phoneNumber || '',
                instagram: profileData.instagramLink || '',
                facebook: profileData.facebookLink || '',
                linkedin: profileData.linkedinLink || '',
                description: profileData.description || '',
                nif: profileData.nif || '',
            }

            if (profileData.profilePicture) {
                setImageUrl(profileData.profilePicture)
            }

            form.setFieldsValue(formValues)
        }
    }, [profileData, form, setImageUrl])

    useEffect(() => {
        if (isProfileError && profileError) {
            message.error('Erro ao carregar dados do perfil: ' + profileError.message)
        }
    }, [isProfileError, profileError])

    useEffect(() => {
        if (uploadedImageUrl) {
            setImageUrl(uploadedImageUrl)
            setImageFile(null)
        }
    }, [uploadedImageUrl])

    useEffect(() => {
        if (isUpdateSuccess && updateData) {
            refetchProfile()

            const updatedProfile = updateData.updatedUserProfile

            if (updatedProfile) {
                const newFormValues = {
                    name: updatedProfile.name || '',
                    countryCode: updatedProfile.countryCode || '',
                    phone: updatedProfile.phoneNumber || '',
                    instagram: updatedProfile.instagramLink || '',
                    facebook: updatedProfile.facebookLink || '',
                    linkedin: updatedProfile.linkedinLink || '',
                    description: updatedProfile.description || '',
                }

                form.setFieldsValue(newFormValues)

                if (updatedProfile.profilePicture) {
                    setImageUrl(updatedProfile.profilePicture)
                }
            }

            const updatedLegal = updateData.updatedUserProfessionalInformation
            if (updatedLegal) {
                form.setFieldsValue({
                    nif: updatedLegal.nif || '',
                })
            }
        }
    }, [isUpdateSuccess, updateData, form, setImageUrl, refetchProfile])

    const initialFormValues = {}

    const buildProfileData = (values: any): ProfileUpdateData => {
        const profileData: ProfileUpdateData = {}

        if (values.name) {
            profileData.name = values.name
        }
        if (values.phone) {
            profileData.phone = values.phone
        }
        if (values.countryCode) {
            profileData.countryCode = values.countryCode
        }
        if (values.instagram) {
            profileData.instagram = values.instagram
        }
        if (values.facebook) {
            profileData.facebook = values.facebook
        }
        if (values.linkedin) {
            profileData.linkedin = values.linkedin
        }
        if (values.description) {
            profileData.description = values.description
        }

        if (values.personalId) {
            profileData.personalId = values.personalId
        }
        if (values.personalIdValidity) {
            profileData.personalIdValidity = values.personalIdValidity
        }
        if (values.nif) {
            profileData.nif = values.nif
        }

        return profileData
    }

    const handleSubmit = (values: any) => {
        const profileData = buildProfileData(values)
        const hasProfileChanges = Object.keys(profileData).length > 0
        const hasImageChange = !!imageFile

        if (hasImageChange && imageFile) {
            uploadImage(imageFile)
        }

        if (hasProfileChanges) {
            updateProfile(profileData)
        }

        if (!hasProfileChanges && !hasImageChange) {
            message.info('Nenhuma alteração detectada')
        }
    }

    const handleUpload = (info: any) => {
        if (info.file.status === 'uploading') {
            return
        }

        const file = info.file.originFileObj || info.file

        if (file) {
            setImageFile(file)

            const reader = new FileReader()
            reader.addEventListener('load', () => {
                setImageUrl(reader.result as string)
            })
            reader.readAsDataURL(file)
        }
    }

    const beforeUpload = (file: File): boolean => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
        if (!isJpgOrPng) {
            message.error('Você só pode enviar arquivos JPG/PNG!')
            return false
        }

        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
            message.error('A imagem deve ser menor que 2MB!')
            return false
        }

        return false
    }

    return {
        form,
        imageUrl,
        handleSubmit,
        handleUpload,
        beforeUpload,
        handleGoBack,
        initialFormValues,
        isUploading,
        isUpdating,
        imageFile,
        isLoadingProfile,
        isProfileError,
        profileError
    }
}
