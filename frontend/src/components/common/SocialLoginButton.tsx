import React from 'react';

interface SocialLoginButtonProps {
  platform: string;
  onClick: () => void;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ platform, onClick }) => (
  <button className={`social-login-button ${platform}`} onClick={onClick}>
    Sign in with {platform}
  </button>
);

export default SocialLoginButton;
