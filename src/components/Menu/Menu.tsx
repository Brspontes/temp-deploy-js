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

const MenuSideBar = () => {
  const navigate = useNavigate()
  const [handleMouse, setHandleMouse] = useState(false)

  const handleMouseEnter = () => {
    setHandleMouse(true)
  }

  const handleMouseLeave = () => {
    setHandleMouse(false)
  }

  return (
    <Menu className="sidebar-container" mode="inline">
      <Menu.Item key="home-option" icon={<img src={home} />}>
        Dashboard
      </Menu.Item>
      <Menu.SubMenu
        key="work-option"
        title="Trabalhos"
        icon={<img src={work} />}
      >
        <Menu.Item
          key="opened-work-option"
          onClick={() => navigate('/home/jobs/open-jobs')}
        >
          Em Aberto
        </Menu.Item>
        <Menu.Item key="closed-work-option">Passados</Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="search-option" icon={<img src={search} />}>
        Pesquisar
      </Menu.Item>
      <Menu.Item key="payment-option" icon={<img src={currency} />}>
        Pagamentos
      </Menu.Item>
      <Menu.Item key="customer-option" icon={<img src={clients} />}>
        Clientes
      </Menu.Item>
      <Menu.Item key="notification-option" icon={<img src={Notificações} />}>
        Notificações
      </Menu.Item>
      <Menu.Item key="profile-option" icon={<img src={avatar} />}>
        Meu Perfil
      </Menu.Item>
      <Menu.Item
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        key="newjob-option"
        icon={handleMouse ? <img src={novoJobHover} /> : <img src={novoJob} />}
        onClick={() => {
          navigate(`/home/new-job`)
        }}
      >
        Novo Anúncio
      </Menu.Item>
    </Menu>
  )
}

export default MenuSideBar
