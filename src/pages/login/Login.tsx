import './Login.less'
import loginSvg from '@/assets/apply-logo.svg'
import textSvg from '@/assets/texto-background.svg'
import { useToDoLogin } from '@/hooks/useLogin'

import { Button, Col, Input, Row, Spin } from 'antd'
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  LoadingOutlined
} from '@/utils/icons'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { systemMessage } from '@/utils/message'
import { toastErrorConfig } from '@/utils/util'

function Login() {
  const { mutate, isPending } = useToDoLogin()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('userLogged')) {
      toast(systemMessage.login.unauthorizedPage, toastErrorConfig)
      localStorage.clear()
    }
  }, [])

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
        className="mobile-login-side"
        xs={{ span: 24 }}
        sm={{ span: 24 }}
        md={{ span: 12 }}
        lg={{ span: 12 }}
        xl={{ span: 12 }}
      >
        <div className="login-side">
          <img src={loginSvg} alt="Logo Apply" />
          <Input
            className="input-email-login"
            prefix={<UserOutlined className="input-email-login-ico" />}
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input.Password
            className="input-password-login"
            prefix={<LockOutlined className="input-email-login-ico" />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
            placeholder="Palavra-passe"
            onChange={(e) => setPassword(e.target.value)}
          />
          <a className="forgot-password" href="#" onClick={(e) => {
            e.preventDefault();
            navigate('/forgot-password');
          }}>
            Esqueceste a Palavra-passe?
          </a>
          <Button
            className="btn-login"
            type="primary"
            onClick={() => mutate({ email, password })}
          >
            {isPending ? (
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              />
            ) : (
              'Iniciar Sessão'
            )}
          </Button>
          <p className="register">
            Não tens uma conta? <a href="#" onClick={() => navigate('/register')}>Registra-te</a>
          </p>
        </div>
      </Col>
    </Row>
  )
}

export default Login