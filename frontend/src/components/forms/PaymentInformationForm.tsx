import React, { useState } from 'react';
import TextInput from '../common/TextInput';
import PrimaryButton from '../common/PrimaryButton';

const PaymentInformationForm: React.FC = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  return (
    <form>
      <TextInput label="Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
      <TextInput label="Expiry Date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
      <TextInput label="CVV" value={cvv} onChange={(e) => setCvv(e.target.value)} />
      <PrimaryButton onClick={() => {}}>Pay</PrimaryButton>
    </form>
  );
};

export default PaymentInformationForm;
