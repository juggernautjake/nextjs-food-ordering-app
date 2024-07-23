import React from 'react';

type SearchInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ value, onChange }) => (
  <div className="input-group">
    <input type="text" value={value} onChange={onChange} placeholder="Search..." />
  </div>
);

export default SearchInput;
