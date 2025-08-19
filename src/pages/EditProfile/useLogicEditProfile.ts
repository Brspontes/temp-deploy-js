import { useState } from 'react'
import { Form, message } from 'antd'
import { useNavigate } from 'react-router-dom'

export const useLogicEditProfile = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm()
    const [imageUrl, setImageUrl] = useState<string>()

    const handleSubmit = (values: any) => {
        console.log('Form values:', values)
        message.success('Perfil atualizado com sucesso!')
    }

    const handleUpload = (info: any) => {
        if (info.file.status === 'uploading') {
            return
        }
        if (info.file.status === 'done') {
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                setImageUrl(reader.result as string)
            })
            reader.readAsDataURL(info.file.originFileObj)
        }
    }

    const beforeUpload = (file: File) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
        if (!isJpgOrPng) {
            message.error('Você só pode enviar arquivos JPG/PNG!')
        }
        const isLt2M = file.size / 1024 / 1024 < 2
        if (!isLt2M) {
            message.error('A imagem deve ser menor que 2MB!')
        }
        return isJpgOrPng && isLt2M
    }

    const handleGoBack = () => {
        navigate(-1)
    }

    const initialFormValues = {
        name: 'STATUS Brand',
        email: 'contact@statusbrand.com',
        phone: '16549848126',
        instagram: '@statusbrand',
        facebook: 'facebook.com/statusbrand',
        description: 'A STATUS Brand Experience é uma agência certificada com mais de 20 anos de experiência em Ativações de Marca, Eventos de Marca, Comunicação de Marca & Recursos Humanos em Portugal. Foi criada em 2000 e tornou-se uma agência competitiva no segmento de mercado nacional e internacional, revelando a capacidade de desenvolver projetos 360° para diferentes clientes, para alcançar diversos targets.'
    }

    return {
        form,
        imageUrl,
        handleSubmit,
        handleUpload,
        beforeUpload,
        handleGoBack,
        initialFormValues
    }
}
