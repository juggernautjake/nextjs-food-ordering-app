import React, { useState } from 'react';
import TextInput from '../common/TextInput';
import EmailInput from '../common/EmailInput';
import PrimaryButton from '../common/PrimaryButton';

const ProfileForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleUpdate = () => {
    // Implement profile update logic here
    console.log('Update profile:', { username, email, phoneNumber });
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <TextInput label="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <EmailInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextInput label="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
      <PrimaryButton onClick={handleUpdate}>Update</PrimaryButton>
    </form>
  );
};

export default ProfileForm;