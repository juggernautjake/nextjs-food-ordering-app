import React from 'react';

type AlertProps = {
  type: string;
  message: string;
};

const Alert: React.FC<AlertProps> = ({ type, message }) => (
  <div className={`alert alert-${type}`}>
    {message}
  </div>
);

export default Alert;
