import React, { useState } from 'react';
import TextInput from '../common/TextInput';
import PasswordInput from '../common/PasswordInput';
import PrimaryButton from '../common/PrimaryButton';
import SocialLoginButton from '../common/SocialLoginButton';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement login logic here
    console.log('Login with:', username, password);
  };

  const handleSocialLogin = (platform: string) => {
    // Implement social login logic here
    console.log('Social login with:', platform);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <TextInput label="Username or Email" value={username} onChange={(e) => setUsername(e.target.value)} />
      <PasswordInput label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <PrimaryButton onClick={handleLogin}>Login</PrimaryButton>
      <SocialLoginButton platform="Google" onClick={() => handleSocialLogin('Google')} />
      <SocialLoginButton platform="Facebook" onClick={() => handleSocialLogin('Facebook')} />
      <SocialLoginButton platform="LinkedIn" onClick={() => handleSocialLogin('LinkedIn')} />
    </form>
  );
};

export default LoginForm;