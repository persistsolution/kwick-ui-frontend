import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getVisiblePages = (): number[] => {
    const maxVisiblePages = 5;
    let startPage = Math.max(currentPage - Math.floor(maxVisiblePages / 2), 1);
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  };

  return (
    <ul className="pagination pagination-sm">
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button
          onClick={() => onPageChange(1)}
          className="page-link"
          disabled={currentPage === 1}
        >
          First
        </button>
      </li>
      <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          className="page-link"
          disabled={currentPage === 1}
        >
          Previous
        </button>
      </li>
      {getVisiblePages().map((page) => (
        <li
          key={page}
          className={`page-item ${currentPage === page ? 'active' : ''}`}
        >
          <button
            onClick={() => onPageChange(page)}
            className="page-link"
          >
            {page}
          </button>
        </li>
      ))}
      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          className="page-link"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </li>
      <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
        <button
          onClick={() => onPageChange(totalPages)}
          className="page-link"
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </li>
    </ul>
  );
};

export default Pagination;
