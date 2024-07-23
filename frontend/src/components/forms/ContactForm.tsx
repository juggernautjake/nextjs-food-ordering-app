import React, { useState } from 'react';
import TextInput from '../common/TextInput';
import EmailInput from '../common/EmailInput';
import PrimaryButton from '../common/PrimaryButton';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  return (
    <form>
      <TextInput label="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <EmailInput label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextInput label="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <PrimaryButton onClick={() => {}}>Send</PrimaryButton>
    </form>
  );
};

export default ContactForm;
