import React, { useState } from 'react';
import TextInput from '../common/TextInput';
import PasswordInput from '../common/PasswordInput';
import PrimaryButton from '../common/PrimaryButton';
import SocialLoginButton from '../common/SocialLoginButton';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form>
      <TextInput label="Username or Email" value={username} onChange={(e) => setUsername(e.target.value)} />
      <PasswordInput label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <PrimaryButton onClick={() => {}}>Login</PrimaryButton>
      <SocialLoginButton platform="Google" onClick={() => {}} />
      <SocialLoginButton platform="Facebook" onClick={() => {}} />
      <SocialLoginButton platform="LinkedIn" onClick={() => {}} />
    </form>
  );
};

export default LoginForm;
