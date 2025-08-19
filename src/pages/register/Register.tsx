import './Register.less'
import loginSvg from '@/assets/apply-logo.svg'
import textSvg from '@/assets/texto-background.svg'
import { useToDoRegister } from '@/hooks/useRegister'
import EmailVerification from '@/components/EmailVerification/EmailVerification'

import { Button, Col, Input, Row, Checkbox, Spin } from 'antd'
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  PhoneOutlined,
  MailOutlined,
  LoadingOutlined,
} from '@/utils/icons'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { systemMessage } from '@/utils/message'
import { isAuthenticated, toastErrorConfig, toastSucessConfig } from '@/utils/util'
import { IRegister } from '@/dtos/register.interface'

function Register() {
  const { mutate, isSuccess, isPending } = useToDoRegister()
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [countryCode, setCountryCode] = useState<string>('+351')
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmedPassword, setConfirmedPassword] = useState<string>('')
  const [acceptedTerm, setAcceptedTerm] = useState<boolean>(false)
  const [showVerification, setShowVerification] = useState<boolean>(false)
  
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated()) navigate('/home')
  }, [navigate])

  useEffect(() => {
    if (isSuccess) {
      toast(systemMessage.register.successRegister, toastSucessConfig);
      setShowVerification(true);
    }
  }, [isSuccess]);

  const handleRegister = () => {
    if (password !== confirmedPassword) {
      toast(systemMessage.register.passwordMismatch, toastErrorConfig)
      return
    }
    
    if (!acceptedTerm) {
      toast(systemMessage.register.termsRequired, toastErrorConfig)
      return
    }

    mutate({ 
      name, 
      email, 
      countryCode,
      phoneNumber, 
      password, 
      confirmedPassword,
      acceptedTerm
    } as IRegister)
  }

  if (showVerification) {
    return (
      <EmailVerification 
        email={email}
        onSuccess={() => {
          toast('Conta verificada com sucesso!', toastSucessConfig)
          navigate('/')
        }}
        successRedirectPath="/"
      />
    )
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
        <div className="register-side">
          <img src={loginSvg} alt="Logo Apply" />
          
          <Input
            className="input-field-register"
            prefix={<UserOutlined className="input-field-register-ico" />}
            placeholder="Nome"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          
          <Input
            className="input-field-register"
            prefix={<MailOutlined className="input-field-register-ico" />}
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          
          <div className="phone-input-container">
            <div className="phone-input-wrapper">
              <PhoneOutlined className="input-field-register-ico phone-icon" />
              <select 
                value={countryCode} 
                onChange={(e) => setCountryCode(e.target.value)}
                className="country-code-select"
              >
                <option value="+351">🇵🇹 +351</option>
                <option value="+55">🇧🇷 +55</option>
                <option value="+34">🇪🇸 +34</option>
                <option value="+33">🇫🇷 +33</option>
                <option value="+1">🇺🇸 +1</option>
              </select>
              <div className="phone-separator"></div>
              <input
                type="text"
                placeholder="Telemóvel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="phone-number-input"
              />
            </div>
          </div>
          
          <Input.Password
            className="input-field-register"
            prefix={<LockOutlined className="input-field-register-ico" />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            placeholder="Palavra-passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <Input.Password
            className="input-field-register"
            prefix={<LockOutlined className="input-field-register-ico" />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            placeholder="Repita a palavra-passe"
            value={confirmedPassword}
            onChange={(e) => setConfirmedPassword(e.target.value)}
          />
          
          <div className="terms-container">
            <Checkbox 
              checked={acceptedTerm}
              onChange={(e) => setAcceptedTerm(e.target.checked)}
            >
              Concordo com os <a href="#">Termos e Condições</a>
            </Checkbox>
          </div>
          
          <Button
            className="btn-register"
            type="primary"
            onClick={handleRegister}
            disabled={!name || !email || !phoneNumber || !password || !confirmedPassword || !acceptedTerm}
          >
            {isPending ? (
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              />
            ) : (
              'Registrar'
            )}
          </Button>
          
          <p className="login-link">
            Já tens uma conta? <a href="#" onClick={() => navigate('/')}>Acessa</a>
          </p>
          
          <div className="social-register">
            <p>Ou cadastre-se com</p>
            <div className="social-buttons">
              <Button className="social-btn google-btn">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="24" viewBox="0 0 22 24" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M21.926 12.216C21.926 11.4302 21.8555 10.6746 21.7245 9.94922H11.2871V14.236H17.2513C16.9944 15.6213 16.2137 16.795 15.0399 17.5808V20.3615H18.6215C20.7171 18.4321 21.926 15.5911 21.926 12.216Z" fill="#4285F4"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2868 23.0469C14.279 23.0469 16.7876 22.0545 18.6212 20.362L15.0396 17.5814C14.0472 18.2463 12.7778 18.6392 11.2868 18.6392C8.40035 18.6392 5.95723 16.6897 5.08576 14.0703H1.3833V16.9416C3.20683 20.5635 6.95463 23.0469 11.2868 23.0469Z" fill="#34A853"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M5.08604 14.0728C4.8644 13.4078 4.73846 12.6976 4.73846 11.9672C4.73846 11.2367 4.8644 10.5265 5.08604 9.86153V6.99023H1.38358C0.63301 8.48633 0.204834 10.1789 0.204834 11.9672C0.204834 13.7554 0.63301 15.448 1.38358 16.9441L5.08604 14.0728Z" fill="#FBBC05"/>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2868 5.29051C12.9138 5.29051 14.3747 5.84965 15.5232 6.9478L18.7018 3.76922C16.7825 1.98096 14.2739 0.882812 11.2868 0.882812C6.95463 0.882812 3.20683 3.36623 1.3833 6.9881L5.08576 9.8594C5.95723 7.23997 8.40035 5.29051 11.2868 5.29051Z" fill="#EA4335"/>
                    </svg>
                </span>
              </Button>
              <Button className="social-btn apple-btn">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="26" viewBox="0 0 21 26" fill="none">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M13.8133 4.68261C14.7098 3.6405 15.139 2.27589 15.0003 0.908203C12.3908 0.930595 9.59703 4.19636 10.2585 6.42004C11.6315 6.35288 12.9167 5.72473 13.8133 4.68261ZM16.8294 14.0466C16.6911 12.0419 17.6789 10.1265 19.3925 9.07686C19.368 9.04502 19.3449 9.00968 19.3215 8.97398C19.2905 8.92664 19.259 8.87868 19.2237 8.83744C19.1024 8.67672 18.9707 8.52423 18.8292 8.38099C17.1793 6.71988 14.6854 6.22833 12.5285 7.13911C11.3546 7.56849 10.885 7.80264 10.4103 7.81336C9.93294 7.82414 9.45048 7.60894 8.24135 7.13911C7.16508 6.70734 5.97213 6.6635 4.86707 7.01509C2.34623 7.87412 0.600776 10.1794 0.457607 12.8387C0.251893 15.5483 0.840268 18.2591 2.15077 20.6396C2.82679 22.0091 3.74935 23.2423 4.87224 24.2775C5.64611 25.0079 6.77234 25.2253 7.76251 24.8355C7.99711 24.7619 8.22717 24.6744 8.45148 24.5737C9.86304 23.8772 11.5183 23.8772 12.9298 24.5737C14.383 25.4284 16.2501 25.0078 17.1964 23.6126C18.2743 22.3756 19.1393 20.9682 19.7559 19.4477C19.8288 19.2627 19.8931 19.0745 19.9567 18.8884C19.9878 18.7974 20.0188 18.7069 20.0504 18.6175C18.209 17.813 16.9676 16.0514 16.8294 14.0466Z" fill="#161429"/>
                    </svg>
                </span>
              </Button>
              <Button className="social-btn facebook-btn">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
                        <path d="M0.583008 14.9647C0.583008 22.9554 7.0608 29.4332 15.0516 29.4332C23.0423 29.4332 29.5201 22.9554 29.5201 14.9647C29.5201 6.97389 23.0423 0.496094 15.0516 0.496094C7.0608 0.496094 0.583008 6.97389 0.583008 14.9647Z" fill="#1877F2"/>
                        <path d="M22.2859 14.9647C22.2859 10.9859 19.0305 7.73047 15.0517 7.73047C11.0728 7.73047 7.81738 10.9859 7.81738 14.9647C7.81738 18.5819 10.4398 21.566 13.8761 22.1086V17.0446H12.0675V14.9647H13.8761V13.337C13.8761 11.5285 14.9612 10.5338 16.5889 10.5338C17.4028 10.5338 18.2167 10.7146 18.2167 10.7146V12.5232H17.3124C16.4081 12.5232 16.1368 13.0657 16.1368 13.6083V14.9647H18.1262L17.7645 17.0446H16.0464V22.199C19.6635 21.6565 22.2859 18.5819 22.2859 14.9647Z" fill="white"/>
                    </svg>
                </span>
              </Button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default Register