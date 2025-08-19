import { useState } from 'react'
import { Button, Col, Input, Row, Spin } from 'antd'
import { UserOutlined, LockOutlined, EyeTwoTone, EyeInvisibleOutlined, LoadingOutlined } from '@/utils/icons'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './ForgotPassword.less'

import loginSvg from '@/assets/apply-logo.svg'
import textSvg from '@/assets/texto-background.svg'
import { systemMessage } from '@/utils/message'
import { toastErrorConfig, toastSucessConfig } from '@/utils/util'

const baseUrl = import.meta.env.VITE_API

enum RecoveryStep {
  EMAIL_INPUT,
  CODE_VALIDATION,
  PASSWORD_RESET
}

function ForgotPassword() {
  const [email, setEmail] = useState<string>('')
  const [code, setCode] = useState<string[]>(Array(5).fill(''))
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [currentStep, setCurrentStep] = useState<RecoveryStep>(RecoveryStep.EMAIL_INPUT)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleEmailSubmit = async () => {
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      toast(systemMessage.forgotPassword.invalidEmail, toastErrorConfig)
      return
    }

    setIsLoading(true)
    try {
      await axios.post(`${baseUrl}/companies/forgot-password`, { email })
      setCurrentStep(RecoveryStep.CODE_VALIDATION)
      toast(systemMessage.forgotPassword.codeSent, toastSucessConfig)
    } catch (error) {
      toast(systemMessage.forgotPassword.codeSendError, toastErrorConfig)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCodeChange = (value: string, index: number) => {
    if (value.length <= 1) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)
      
      if (value !== '' && index < 4) {
        const nextInput = document.getElementById(`code-input-${index + 1}`)
        nextInput?.focus()
      }
    }
  }

  const handleCodeValidation = async () => {
    const validationCode = code.join('')
    if (validationCode.length !== 5) {
      toast(systemMessage.forgotPassword.invalidCode, toastErrorConfig)
      return
    }

    setIsLoading(true)
    try {
      await axios.get(`${baseUrl}/companies/${email}/validating-code-recuperation/${validationCode}`)
      setCurrentStep(RecoveryStep.PASSWORD_RESET)
      toast(systemMessage.forgotPassword.codeValidated, toastSucessConfig)
    } catch (error) {
      toast(systemMessage.forgotPassword.codeValidationError, toastErrorConfig)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordReset = async () => {
    if (!newPassword) {
      toast(systemMessage.forgotPassword.emptyPassword, toastErrorConfig)
      return
    }
    
    if (newPassword !== confirmPassword) {
      toast(systemMessage.forgotPassword.passwordMismatch, toastErrorConfig)
      return
    }

    setIsLoading(true)
    try {
      await axios.post(`${baseUrl}/companies/password`, { 
        email, 
        password: newPassword,
        confirmPassword
      })
      toast(systemMessage.forgotPassword.passwordChanged, toastSucessConfig)
      navigate('/')
    } catch (error) {
      toast(systemMessage.forgotPassword.passwordChangeError, toastErrorConfig)
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case RecoveryStep.EMAIL_INPUT:
        return (
          <div className="forgot-password-form">
            <img src={loginSvg} alt="Logo Apply" />
            <h2>Esqueceste-te da Palavra-passe?</h2>
            <p>Vamos enviar um código de verificação para o teu e-mail.</p>
            <Input
              className="input-email"
              prefix={<UserOutlined className="input-email-ico" />}
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              className="btn-continue"
              type="primary"
              onClick={handleEmailSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
              ) : (
                'Continuar'
              )}
            </Button>
            <p className="back-to-login">
              <a href="#" onClick={() => navigate('/')}>Voltar para o login</a>
            </p>
          </div>
        )

      case RecoveryStep.CODE_VALIDATION:
        return (
          <div className="forgot-password-form">
            <img src={loginSvg} alt="Logo Apply" />
            <h2>Código de Verificação</h2>
            <p>Verifica o teu e-mail para encontrares o código de 5 dígitos.</p>
            <div className="code-input-container">
              {code.map((digit, index) => (
                <Input
                  key={index}
                  id={`code-input-${index}`}
                  className="code-input"
                  value={digit}
                  onChange={(e) => handleCodeChange(e.target.value, index)}
                  maxLength={1}
                />
              ))}
            </div>
            <Button
              className="btn-validate"
              type="primary"
              onClick={handleCodeValidation}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
              ) : (
                'Validar'
              )}
            </Button>
            <p className="back-to-login">
              <a href="#" onClick={() => navigate('/')}>Voltar para o login</a>
            </p>
          </div>
        )

      case RecoveryStep.PASSWORD_RESET:
        return (
          <div className="forgot-password-form">
            <img src={loginSvg} alt="Logo Apply" />
            <h2>Definir Nova Palavra-passe</h2>
            <p>Insere e confirma a tua nova palavra-passe.</p>
            <Input.Password
              className="input-password"
              prefix={<LockOutlined className="input-password-ico" />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              placeholder="Nova Palavra-passe"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input.Password
              className="input-password"
              prefix={<LockOutlined className="input-password-ico" />}
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              placeholder="Confirmar Palavra-passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button
              className="btn-reset"
              type="primary"
              onClick={handlePasswordReset}
              disabled={isLoading}
            >
              {isLoading ? (
                <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
              ) : (
                'Redefinir Palavra-passe'
              )}
            </Button>
          </div>
        )
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
        className="mobile-form-side"
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 12 }}
        xl={{ span: 12 }}
      >
        {renderStep()}
      </Col>
    </Row>
  )
}

export default ForgotPassword