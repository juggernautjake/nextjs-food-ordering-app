import React from 'react';

interface EmailInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ label, value, onChange }) => (
  <div className="input-group">
    <label>{label}</label>
    <input type="email" value={value} onChange={onChange} />
  </div>
);

export default EmailInput;
