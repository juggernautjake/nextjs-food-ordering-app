// src/components/layout/Pagination.tsx

import React from 'react';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => (
  <div className="pagination">
    {Array.from({ length: totalPages }, (_, index) => (
      <button
        key={index}
        onClick={() => onPageChange(index + 1)}
        disabled={index + 1 === currentPage}
        className="px-4 py-2 m-2 border rounded text-white bg-blue-500 hover:bg-blue-700 disabled:opacity-50"
      >
        {index + 1}
      </button>
    ))}
  </div>
);

export default Pagination;
