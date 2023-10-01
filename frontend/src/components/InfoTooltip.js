import successLogo from '../images/tooltip-success.svg';
import failureLogo from '../images/tooltip-failure.svg';
import { useNavigate } from 'react-router';

function InfoTooltip({ isSuccess, isOpened, onClose, text }) {
  const navigate = useNavigate();

  function handleClose() {
    onClose();
    if (isSuccess) navigate('/');
  }

  return (
    <div className={"popup popup__info" + (isOpened ? " popup_opened" : "")} id="tooltip-popup">
      <div className="popup__container popup__container_t_tooltip">
        <button className="popup__close" type="button" aria-label="Закрыть" onClick={handleClose}></button>
        <img src={isSuccess ? successLogo : failureLogo} alt="Иконка" className="popup__icon" />
        <p className="popup__text popup__text_t_tooltip">{text}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;