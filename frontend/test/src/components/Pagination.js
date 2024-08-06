// Pagination.js
import React from 'react';
import PageButton from './PageButton';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <PageButton 
          label="Previous" 
          onClick={() => onPageChange(Math.max(currentPage - 1, 1))} 
          disabled={currentPage === 1} 
        />
        <PageButton 
          label="Next" 
          onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))} 
          disabled={currentPage === totalPages} 
        />
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{(currentPage - 1) * 10 + 1}</span> to{' '}
            <span className="font-medium">{Math.min(currentPage * 10, totalPages * 10)}</span> of{' '}
            <span className="font-medium">{totalPages * 10}</span> results
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <PageButton 
              label="Previous" 
              onClick={() => onPageChange(Math.max(currentPage - 1, 1))} 
              disabled={currentPage === 1} 
            />
            {[...Array(totalPages)].map((_, i) => (
              <PageButton 
                key={i + 1} 
                label={i + 1} 
                onClick={() => onPageChange(i + 1)} 
                active={currentPage === i + 1} 
              />
            ))}
            <PageButton 
              label="Next" 
              onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))} 
              disabled={currentPage === totalPages} 
            />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
