import React from 'react';

type TooltipProps = {
  message: string;
  children: React.ReactNode;
};

const Tooltip: React.FC<TooltipProps> = ({ message, children }) => (
  <div className="tooltip">
    {children}
    <span className="tooltip-text">{message}</span>
  </div>
);

export default Tooltip;
