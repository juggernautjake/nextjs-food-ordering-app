import React from 'react';

type BreadcrumbProps = {
  path: string[];
};

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path }) => (
  <nav className="breadcrumb">
    {path.map((crumb, index) => (
      <span key={index} className="text-white">
        {crumb}
        {index < path.length - 1 && ' > '}
      </span>
    ))}
  </nav>
);

export default Breadcrumb;
