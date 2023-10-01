import React from 'react';
import logo from '../images/logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';

function Header({onMenuClick, onSignOut, isOpen, email}) {
  const location = useLocation();
  const navigate = useNavigate();
  const [button, setButton] = React.useState({});

  function setupButton() {
    switch (location.pathname) {
      case ('/'):
        setButton({
          text: 'Выйти',
          onClick: () => {
           onSignOut();
            navigate('/sign-in');
          }
        })
        break;
      case ('/sign-in'):
        setButton({
          text: 'Регистрация',
          onClick: () => {
            navigate('/sign-up');
          }
        })
        break;
      case ('/sign-up'):
        setButton({
          text: 'Войти',
          onClick: () => {
            navigate('/sign-in');
          }
        })
        break;
    }
  }

  React.useEffect(() => {
    setupButton();
  }, [location.pathname])

  return (
    <header className="header container">
      <img src={logo} alt="Место. Логотип" className="header__logo" />
      <div className={`header__text-block${(location?.pathname === '/') ? ' header__text-block_logged' : ''}`}>
        {(location?.pathname === '/') && <p className='header__email'>{email}</p>}
        <button
          className={`header__btn${(location?.pathname === '/' ? ' header__btn_logged' : '')}`}
          onClick={button?.onClick}>
          {button?.text}
        </button>
      </div>
      {(location?.pathname === '/') &&
        <div className={`header__burger${isOpen ? ' header__burger_active' : ''}`} onClick={onMenuClick}>
          <span className="header__burger-line" />
          <span className="header__burger-line" />
          <span className="header__burger-line" />
        </div>}
    </header>
  );
}

export default Header;