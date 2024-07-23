import React from 'react';

interface PasswordInputProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ label, value, onChange }) => (
  <div className="input-group">
    <label>{label}</label>
    <input type="password" value={value} onChange={onChange} />
  </div>
);

export default PasswordInput;
