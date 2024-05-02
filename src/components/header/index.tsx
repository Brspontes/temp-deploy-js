import './style.less'
import logo from '../../assets/apply-logo-header.svg'

const Header = () => {
  return (
    <>
      <div className="header-container">
        <img src={logo} alt="logo" className="header-logo" />
      </div>
    </>
  )
}

export default Header
