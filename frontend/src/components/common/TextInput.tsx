import React, { ChangeEvent } from 'react';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  multiline?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ label, value, onChange, multiline = false }) => (
  <div className="input-group">
    <label>{label}</label>
    {multiline ? (
      <textarea value={value} onChange={onChange} />
    ) : (
      <input type="text" value={value} onChange={onChange} />
    )}
  </div>
);

export default TextInput;
