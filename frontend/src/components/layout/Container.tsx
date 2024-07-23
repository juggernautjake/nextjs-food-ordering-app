// src/components/layout/Container.tsx

import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className="container">
    {children}
  </div>
);

export default Container;
