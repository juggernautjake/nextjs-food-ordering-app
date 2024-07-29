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

  const handleRegister = () => {
    // Implement registration logic here
    console.log('Register with:', { email, username, password, confirmPassword });
  };

  const handleSocialRegister = (platform: string) => {
    // Implement social registration logic here
    console.log('Social register with:', platform);
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <EmailInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextInput label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <PasswordInput label="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <PasswordInput label="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      <PrimaryButton onClick={handleRegister}>Register</PrimaryButton>
      <SocialLoginButton platform="Google" onClick={() => handleSocialRegister('Google')} />
      <SocialLoginButton platform="Facebook" onClick={() => handleSocialRegister('Facebook')} />
      <SocialLoginButton platform="LinkedIn" onClick={() => handleSocialRegister('LinkedIn')} />
    </form>
  );
};

export default RegistrationForm;