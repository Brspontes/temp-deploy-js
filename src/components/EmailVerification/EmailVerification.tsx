import './style.less'
import loginSvg from '@/assets/apply-logo.svg'
import textSvg from '@/assets/texto-background.svg'

import { Button, Col, Input, Row, Spin } from 'antd'
import { LoadingOutlined } from '@/utils/icons'

import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-toastify'
import { toastErrorConfig, toastSucessConfig } from '@/utils/util'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_API

interface EmailVerificationProps {
  readonly email: string
  readonly onSuccess?: () => void
  readonly successRedirectPath?: string
  readonly fromLogin?: boolean
}

function EmailVerification({ email, onSuccess, successRedirectPath = '/', fromLogin = false }: EmailVerificationProps) {
  const [code, setCode] = useState<string[]>(['', '', '', '', ''])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const codeInputsRef = useRef<(HTMLInputElement | null)[]>([])
  const hasInitializedRef = useRef<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()

  const isFromLogin = fromLogin || location.state?.fromLogin

  const storageKey = `email-verification-initialized-${email}`

  useEffect(() => {
    const generateInitialCode = async () => {
      const alreadyInitialized = sessionStorage.getItem(storageKey)
      
      if (isFromLogin && email && !hasInitializedRef.current) {
        hasInitializedRef.current = true
        
        if (alreadyInitialized) {
          sessionStorage.removeItem(storageKey)
        }
        
        sessionStorage.setItem(storageKey, 'true')
        try {
          setIsLoading(true)
          const response = await axios.post(
            `${baseUrl}/companies/resend-validation-code`, 
            { email },
            { headers: { 'Content-Type': 'application/json' } }
          )
          
          if (response.status === 200 || response.status === 201 || response.status === 204) {
            toast('Código enviado para o seu email!', toastSucessConfig)
          }
        } catch (error) {
          toast('Não foi possível enviar o código. Tente reenviar.', toastErrorConfig)
          hasInitializedRef.current = false
          sessionStorage.removeItem(storageKey)
        } finally {
          setIsLoading(false)
        }
      }
    }

    generateInitialCode()
  }, [isFromLogin, email, storageKey])

  const handleCodeChange = (value: string, index: number) => {
    if (value.length <= 1) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)
      
      if (value.length === 1 && index < 4) {
        codeInputsRef.current[index + 1]?.focus()
      }
    }
  }

  const handleCodeValidation = async () => {
    const fullCode = code.join('')
    if (fullCode.length !== 5) {
      toast('Por favor, insira o código completo de 5 dígitos', toastErrorConfig)
      return
    }

    setIsLoading(true)
    try {

      if (!email) {
        toast('Email não encontrado. Por favor, tente novamente.', toastErrorConfig)
        setIsLoading(false)
        return
      }

      const response = await axios.get(
        `${baseUrl}/companies/${encodeURIComponent(email)}/validating/company/account/code/${fullCode}`
      )

      if (response.status === 200 || response.status === 201 || response.status === 204) {
        toast('Conta verificada com sucesso!', toastSucessConfig)
        sessionStorage.removeItem(storageKey)
        if (onSuccess) {
          onSuccess()
        } else {
          navigate(successRedirectPath)
        }
      } else {
        toast('Ocorreu um erro na verificação. Por favor, tente novamente.', toastErrorConfig)
      }
    } catch (error: any) {
      console.error('Erro na validação do código:', error)
      const errorMessage = error.response?.data?.message || 
                          'Código inválido ou expirado. Por favor, verifique e tente novamente.'
      toast(errorMessage, toastErrorConfig)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendCode = async () => {
    try {
      setIsLoading(true)
      const response = await axios.post(
        `${baseUrl}/companies/resend-validation-code`, 
        { email },
        { headers: { 'Content-Type': 'application/json' } }
      )
      
      if (response.status === 200 || response.status === 201 || response.status === 204) {
        toast('Código reenviado com sucesso!', toastSucessConfig)
      }
    } catch (error) {
      console.error('Erro ao reenviar o código:', error)
      toast('Não foi possível reenviar o código. Tente novamente.', toastErrorConfig)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Row className="background">
      <Col
        className="mobile-banner-side"
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 12 }}
        xl={{ span: 12 }}
      >
        <div className="backgroud-image-login">
          <img className="welcome-text" src={textSvg} alt="texto boas vindas" />
        </div>
      </Col>
      <Col
        className="mobile-register-side"
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 12 }}
        xl={{ span: 12 }}
      >
        <div className="forgot-password-form">
          <img src={loginSvg} alt="Logo Apply" />
          <h2>Código de Verificação</h2>
          <p>Verifica o teu e-mail para encontrares o código de 5 dígitos.</p>
          <div className="code-input-container">
            {Array.from({ length: 5 }, (_, index) => (
              <Input
                key={`verification-code-${index}`}
                id={`code-input-${index}`}
                className="code-input"
                value={code[index] || ''}
                onChange={(e) => handleCodeChange(e.target.value, index)}
                maxLength={1}
                ref={(el) => {
                  codeInputsRef.current[index] = el?.input || null
                }}
              />
            ))}
          </div>
          <Button
            className="btn-validate"
            type="primary"
            onClick={handleCodeValidation}
            disabled={isLoading || code.join('').length !== 5}
          >
            {isLoading ? (
              <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
            ) : (
              'Validar'
            )}
          </Button>
          <p className="resend-code">
            Não recebeu o código? <button type="button" className="link-button" onClick={handleResendCode}>Reenviar</button>
          </p>
          <p className="back-to-login">
            <button type="button" className="link-button" onClick={() => navigate('/')}>Voltar para o login</button>
          </p>
        </div>
      </Col>
    </Row>
  )
}

export default EmailVerification
