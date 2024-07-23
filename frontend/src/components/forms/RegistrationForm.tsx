import React, { useState } from 'react';
import EmailInput from '../common/EmailInput';
import TextInput from '../common/TextInput';
import PasswordInput from '../common/PasswordInput';
import PrimaryButton from '../common/PrimaryButton';
import SocialLoginButton from '../common/SocialLoginButton';

const RegistrationForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <form>
      <EmailInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextInput label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <PasswordInput label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <PasswordInput label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <PrimaryButton onClick={() => {}}>Register</PrimaryButton>
      <SocialLoginButton platform="Google" onClick={() => {}} />
      <SocialLoginButton platform="Facebook" onClick={() => {}} />
      <SocialLoginButton platform="LinkedIn" onClick={() => {}} />
    </form>
  );
};

export default RegistrationForm;
