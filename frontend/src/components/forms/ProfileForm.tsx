import React, { useState } from 'react';
import TextInput from '../common/TextInput';
import EmailInput from '../common/EmailInput';
import PrimaryButton from '../common/PrimaryButton';

const ProfileForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  return (
    <form>
      <TextInput label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <EmailInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextInput label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <PrimaryButton onClick={() => {}}>Update</PrimaryButton>
    </form>
  );
};

export default ProfileForm;
