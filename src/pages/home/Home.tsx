import { Outlet } from 'react-router-dom'
import Header from '../../components/header'
import './style.less'
import MenuSideBar from '../../components/Menu/Menu'
import Chat from '../../components/Chat/Chat'

function Home() {
  return (
    <>
      <Header />
      <div className="container-home">
        <MenuSideBar />
        <div className="content">
          <Outlet />
        </div>
        <Chat />
      </div>
    </>
  )
}

export default Home
