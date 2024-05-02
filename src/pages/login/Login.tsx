import './Login.less'
import loginSvg from '../../assets/apply-logo.svg'
import { Button, Input } from 'antd'
import {
  UserOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from '@ant-design/icons'
import { useToDoLogin } from '../../hooks/useLogin'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

function Login() {
  const { mutate, isSuccess, isPending } = useToDoLogin()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()

  useEffect(() => {
    if (isSuccess) navigate('/home')
  }, [isSuccess, navigate])

  return (
    <>
      <div className="background">
        <div className="backgroud-image-login">
          <div className="backgroud-text-login"></div>
        </div>
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
          <a className="forgot-password" href="#">
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
            Não tens uma conta? <a href="#">Registra-te</a>
          </p>
        </div>
      </div>
    </>
  )
}

export default Login
