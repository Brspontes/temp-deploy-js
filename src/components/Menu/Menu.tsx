import './style.less'
import { Menu } from 'antd'

import {
  home,
  work,
  search,
  currency,
  clients,
  Notificações,
  avatar,
  novoJob,
} from '../../assets/sidebar-disabled/index'

import { useState } from 'react'
import { novoJobHover } from '../../assets/sidebar-enabled'
import { useNavigate } from 'react-router-dom'
import { LogoutOutlined } from '@/utils/icons'

const MenuSideBar = () => {
  const navigate = useNavigate()
  const [handleMouse, setHandleMouse] = useState(false)

  const handleMouseEnter = () => {
    setHandleMouse(true)
  }

  const handleMouseLeave = () => {
    setHandleMouse(false)
  }

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <Menu className="sidebar-container" mode="inline">
      <Menu.Item 
        key="home-option" 
        icon={<img src={home} alt="" />}
        onClick={() => navigate('/home/dashboard')}
      >
        Dashboard
      </Menu.Item>
      <Menu.SubMenu
        key="work-option"
        title="Trabalhos"
        icon={<img src={work} alt="" />}
      >
        <Menu.Item
          key="opened-work-option"
          onClick={() => navigate('/home/jobs/open-jobs')}
        >
          Em Aberto
        </Menu.Item>
        <Menu.Item key="closed-work-option">Passados</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="search-option" icon={<img src={search} alt="" />}>
        Pesquisar
      </Menu.Item>
      <Menu.Item key="payment-option" icon={<img src={currency} alt="" />}>
        Pagamentos
      </Menu.Item>
      <Menu.Item key="customer-option" icon={<img src={clients} alt="" />}>
        Clientes
      </Menu.Item>
      <Menu.Item key="notification-option" icon={<img src={Notificações} alt="" />}>
        Notificações
      </Menu.Item>
      <Menu.Item 
        key="profile-option" 
        icon={<img src={avatar} alt="" />}
        onClick={() => navigate('/home/edit-profile')}
      >
        Meu Perfil
      </Menu.Item>
      <Menu.Item
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        key="newjob-option"
        icon={handleMouse ? <img src={novoJobHover} alt="" /> : <img src={novoJob} alt="" />}
        onClick={() => {
          navigate(`/home/new-job`)
        }}
      >
        Novo Anúncio
      </Menu.Item>
      <Menu.Item
        key="logout-option"
        icon={<LogoutOutlined style={{ color: '#D87575' }} />}
        onClick={handleLogout}
        className="logout-item"
        style={{ marginTop: 'auto', color: '#D87575' }}
      >
        Logout
      </Menu.Item>
    </Menu>
        
  )
}

export default MenuSideBar
