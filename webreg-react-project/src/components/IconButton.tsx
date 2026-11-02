import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faPen,
  faUser,
  faArrowRightToBracket,
} from '@fortawesome/free-solid-svg-icons';

interface IconButtonProps {
  icon: 'home' | 'create' | 'login' | 'register';
  label: string;
  onClick?: () => void;
  className?: string;
}

export function IconButton({ icon, label, onClick, className }: IconButtonProps) {
  const icons = {
    home: faHome,
    create: faPen,
    login: faArrowRightToBracket, 
    register: faUser,             
  };

  const iconToRender = icons[icon];

  return (
    <button
      onClick={onClick}
      className={`nav-btn ${className}`} 
      style={{ color: '#7b8cd6' }}      
    >
      <FontAwesomeIcon
        icon={iconToRender}
        style={{ marginRight: '8px', width: 18, height: 18 }}
      />
      {label}
    </button>
  );
}