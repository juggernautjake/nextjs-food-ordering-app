// src/components/layout/Container.tsx

import React, { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => (
  <div className="container mx-auto text-dark"> {/* Added text-dark for default text color */}
    {children}
  </div>
);

export default Container;
