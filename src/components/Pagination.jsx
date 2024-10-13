import React from 'react';

const Pagination = ({ currentPage, totalPages, onNext, onPrevious }) => {
    return (
        <div className="flex justify-between mt-4">
            <button
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                onClick={onPrevious}
                disabled={currentPage === 0}
            >
                Previous
            </button>
            <span className="self-center">
                Page {currentPage + 1} of {totalPages}
            </span>
            <button
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                onClick={onNext}
                disabled={currentPage >= totalPages - 1}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;