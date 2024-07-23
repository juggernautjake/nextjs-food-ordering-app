// src/components/forms/AddressForm.tsx
import React, { useState } from 'react';
import TextInput from '../common/TextInput';
import PrimaryButton from '../common/PrimaryButton';

const AddressForm: React.FC = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  return (
    <form>
      <TextInput label="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
      <TextInput label="City" value={city} onChange={(e) => setCity(e.target.value)} />
      <TextInput label="State" value={state} onChange={(e) => setState(e.target.value)} />
      <TextInput label="Zip Code" value={zip} onChange={(e) => setZip(e.target.value)} />
      <PrimaryButton onClick={() => { /* handle submit */ }}>Submit</PrimaryButton>
    </form>
  );
};

export default AddressForm;
