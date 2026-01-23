import { css } from '../../styled-system/css';

export const Button = ({ children, variant = 'primary', ...props }) => {
  const buttonStyles = css({
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    border: 'none',
    transition: 'all 0.2s',
    backgroundColor: variant === 'primary' ? '#646cff' : '#f9f9f9',
    color: variant === 'primary' ? 'white' : '#213547',
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    },
    '&:active': {
      transform: 'translateY(0)',
    }
  });

  return (
    <button className={buttonStyles} {...props}>
      {children}
    </button>
  );
};
